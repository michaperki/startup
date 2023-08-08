import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
  update,
  push,
} from "firebase/database";
import app from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const db = getDatabase(app);
const USERS_PATH = "users";
const TASK_LISTS_PATH = "task_lists";
const TASK_PERFORMANCE_PATH = "taskPerformance";
const SCORE_PATH = "lifelo";
const TASK_PATH = "taskId";

function getUserRef(uid) {
  return ref(db, `${USERS_PATH}/${uid}`);
}

function getTaskPerformanceRef(uid, taskId) {
  return ref(
    db,
    `${USERS_PATH}/${uid}/${TASK_PERFORMANCE_PATH}/${TASK_PATH + taskId}`
  );
}

export function fetchValueFromRefOnce(userRef) {
  return get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("No data found");
    }
  });
}

export function fetchValueFromRef(userRef, callback) {
  return new Promise((resolve, reject) => {
    onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(callback(data));
        } else {
          reject(new Error("No data found"));
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export function updateValueAtRef(ref, value) {
  if (typeof value === "object") {
    return update(ref, value).catch((error) => {
      console.error("Error updating value:", error);
      throw error;
    });
  } else {
    return set(ref, value).catch((error) => {
      console.error("Error setting value:", error);
      throw error;
    });
  }
}

export function getScoreRef(uid) {
  return ref(db, `${USERS_PATH}/${uid}/${SCORE_PATH}`);
}

export function getTaskListsRef() {
  return ref(db, TASK_LISTS_PATH);
}

export function logIn(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOut() {
  const auth = getAuth();
  return auth.signOut();
}

export function signUp(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export function createUserInDB(uid) {
  return updateValueAtRef(getUserRef(uid), {
    hasCompletedTutorial: false,
    provisional: true,
    lifelo: 1500,
    taskPerformance: {
      taskId1: { completed: 3, skipped: 1 },
      taskId2: { completed: 5, skipped: 0 },
    },
  });
}

export function getTutorialStatus(uid) {
  return fetchValueFromRef(getUserRef(uid), (data) => {
    return data.hasCompletedTutorial;
  });
}

export function completeTutorial(uid) {
  return updateValueAtRef(getUserRef(uid), {
    hasCompletedTutorial: true,
  });
}

export function getLifelo(uid) {
  return fetchValueFromRef(getUserRef(uid), (data) => {
    return data.lifelo;
  });
}

export function updateLifelo(uid, lifelo) {
  return updateValueAtRef(getUserRef(uid), { lifelo });
}

export function getTaskPerformance(uid) {
  return fetchValueFromRef(getUserRef(uid), (data) => {
    return data.taskPerformance;
  });
}

export function updateTaskPerformance(uid, taskId, taskData) {
  return updateValueAtRef(getTaskPerformanceRef(uid, taskId), taskData);
}

export function getUserTaskPerformanceRef(uid, taskId) {
  return ref(
    db,
    `${USERS_PATH}/${uid}/${TASK_PERFORMANCE_PATH}/${TASK_PATH + taskId}`
  );
}

export function updateSpecificTaskPerformance(uid, taskId, taskData) {
  const taskRef = getUserTaskPerformanceRef(uid, taskId);
  
  return get(taskRef)
      .then(snapshot => {
          let existingData = snapshot.val();

          if (!existingData) {
              existingData = {
                  completed: 0,
                  skipped: 0,
                  events: []
              };
          }

          const mergedData = {
              ...existingData,
              ...taskData
          };
          
          // Check the contents of mergedData to ensure it's correctly formed
          console.log("[Firebase Service] mergedData:", JSON.stringify(mergedData));

          return set(taskRef, mergedData);
      })
      .catch((error) => {
          console.error("[Firebase Service] Error during updateSpecificTaskPerformance:", error.message);
          console.error("[Firebase Service] Existing data:", JSON.stringify(existingData));
          console.error("[Firebase Service] Received task data:", JSON.stringify(taskData));
          
          // Fallback action in case of an error
          return set(taskRef, taskData);
      });
}

export function getSpecificTaskPerformance(uid, taskId) {
  return fetchValueFromRefOnce(getTaskPerformanceRef(uid, taskId));
}

export function getProvisional(uid) {
  return fetchValueFromRef(getUserRef(uid), (data) => {
    return data.provisional;
  });
}

export function updateProvisional(uid, provisional) {
  return updateValueAtRef(getUserRef(uid), { provisional });
}

function getTaskPerformanceEventsRef(uid, taskId) {
  return ref(
    db,
    `${USERS_PATH}/${uid}/${TASK_PERFORMANCE_PATH}/${TASK_PATH + taskId}/events`
  );
}

// Function to record a task event (either 'completed' or 'skipped')
export function recordTaskEvent(uid, taskId, action) {
  if (!["completed", "skipped"].includes(action)) {
    throw new Error("Invalid action. Must be 'completed' or 'skipped'.");
  }

  const event = {
    action,
    timestamp: Date.now(),
  };

  const eventsRef = getTaskPerformanceEventsRef(uid, taskId);
  return push(eventsRef, event); // Use push correctly here
}
// Function to fetch all task events for a specific task
export function fetchTaskEvents(uid, taskId) {
  return fetchValueFromRefOnce(getTaskPerformanceEventsRef(uid, taskId));
}
