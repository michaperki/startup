import app from "../firebase";
import { recordTaskEvent, fetchTaskEvents } from "./firebaseService"; // Assuming the functions are in this file
import { getDatabase, ref, get, onValue, update } from "firebase/database";

const db = getDatabase(app);

const USERS_PATH = "users";
const TASK_LISTS_PATH = "task_lists";
const TASK_PERFORMANCE_PATH = "taskPerformance";
const TASK_PATH = "taskId";

function getUserRef(uid) {
  return ref(db, `${USERS_PATH}/${uid}`);
}

function getTaskListsRef() {
  return ref(db, TASK_LISTS_PATH);
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

// Removed the updateValueAtRef function as it's not compatible with the new schema

export function getScoreRef(uid) {
  return ref(db, `${USERS_PATH}/${uid}/${SCORE_PATH}`);
}

export const taskService = {
  fetchTaskLists: () => {
    const ref = getTaskListsRef();
    return fetchValueFromRefOnce(ref);
  },

  // Replaced with a more meaningful function name and implementation
  recordUserTaskAction: (uid, taskId, action) => {
    return recordTaskEvent(uid, taskId, action);
  },

  getTaskPerformance: (uid) => {
    return fetchValueFromRef(getUserRef(uid), (data) => {
      return data.taskPerformance;
    });
  },

  // Fetches all events for a specific task
  fetchTaskEventsForUser: (uid, taskId) => {
    return fetchTaskEvents(uid, taskId);
  },

  // Removed updateSpecificTaskPerformance and getSpecificTaskPerformance 
  // since they don't fit with the new schema and are replaced by the new methods.
};

