// services/userService.js

import { ref, onValue, set, get, update, getDatabase } from "firebase/database";
import app from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { fetchValueFromRef, updateValueAtRef } from "./firebaseService";

const db = getDatabase(app);
const USERS_PATH = "users";

function getUserRef(uid) {
  return ref(db, `${USERS_PATH}/${uid}`);
}

export const userService = {
  logIn: (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  },
  
  signOut: () => {
    const auth = getAuth();
    return auth.signOut();
  },
  
  signUp: (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  },

  createUserInDB: (uid) => {
    return updateValueAtRef(getUserRef(uid), {
      hasCompletedTutorial: false,
      provisional: true,
      lifelo: 1500,
      taskPerformance: {
        taskId1: { completed: 3, skipped: 1 },
        taskId2: { completed: 5, skipped: 0 },
      },
    });
  },

  getTutorialStatus: (uid) => {
    return fetchValueFromRef(getUserRef(uid), (data) => {
      return data.hasCompletedTutorial;
    });
  },

  completeTutorial: (uid) => {
    return updateValueAtRef(getUserRef(uid), {
      hasCompletedTutorial: true,
    });
  },

  getLifelo: (uid) => {
    return fetchValueFromRef(getUserRef(uid), (data) => {
      return data.lifelo;
    });
  },

  updateLifelo: (uid, lifelo) => {
    return updateValueAtRef(getUserRef(uid), { lifelo });
  },

  getProvisional: (uid) => {
    return fetchValueFromRef(getUserRef(uid), (data) => {
      return data.provisional;
    });
  },

  updateProvisional: (uid, provisional) => {
    return updateValueAtRef(getUserRef(uid), { provisional });
  },
};
