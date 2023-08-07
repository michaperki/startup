import { useCallback } from 'react';
import { getSpecificTaskPerformance, updateSpecificTaskPerformance } from "../services/firebaseService";

const useTaskPerformance = (uid) => {
  const fetchPerformance = useCallback(async (taskId) => {
    try {
      return await getSpecificTaskPerformance(uid, taskId);
    } catch {
      console.log("No existing data for this task, initializing...");
      return null;
    }
  }, [uid]);

  const savePerformance = useCallback(async (taskId, key, value) => {
    await updateSpecificTaskPerformance(uid, taskId, { [key]: value });
  }, [uid]);

  return { fetchPerformance, savePerformance };
};

export default useTaskPerformance;
