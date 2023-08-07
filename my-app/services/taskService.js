// services/taskService.js

import { ref, onValue, set, get, update, getDatabase } from "firebase/database";
import app from "../firebase";

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

export function getTaskPerformanceRef(uid, taskId) {
  return ref(
    db,
    `${USERS_PATH}/${uid}/${TASK_PERFORMANCE_PATH}/${TASK_PATH + taskId}`
  );
}

export const taskService = {
  fetchTaskLists: () => {
    const ref = getTaskListsRef();
    return fetchValueFromRefOnce(ref);
  },

  updateTaskPerformance: (uid, taskId, taskData) => {
    return updateValueAtRef(getTaskPerformanceRef(uid, taskId), taskData);
  },

  getTaskPerformance: (uid) => {
    return fetchValueFromRef(getUserRef(uid), (data) => {
      return data.taskPerformance;
    });
  },

  updateSpecificTaskPerformance: (uid, taskId, taskData) => {
    const taskRef = getTaskPerformanceRef(uid, taskId);
    return fetchValueFromRefOnce(taskRef)
      .then((existingData) => {
        existingData = existingData || { completed: 0, skipped: 0 };
        taskData = {
          completed: isNaN(taskData.completed) ? 0 : taskData.completed,
          skipped: isNaN(taskData.skipped) ? 0 : taskData.skipped,
        };
        const mergedData = { ...existingData, ...taskData };
        if (isNaN(mergedData.completed) || isNaN(mergedData.skipped)) {
          throw new Error("Computed data contains NaN values");
        }
        return update(taskRef, mergedData);
      })
      .catch((error) => {
        return set(taskRef, taskData);
      });
  },

  getSpecificTaskPerformance: (uid, taskId) => {
    return fetchValueFromRefOnce(getTaskPerformanceRef(uid, taskId));
  },
};
