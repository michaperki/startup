import { useCallback } from 'react';
import { getSpecificTaskPerformance, updateSpecificTaskPerformance, recordTaskEvent } from "../services/firebaseService";

const useTaskPerformance = (uid) => {

  // Function to initialize default task performance data
  const initializeTaskPerformance = useCallback(async (taskId) => {
    const defaultPerformanceData = {
      completed: 0,
      skipped: 0,
      events: []
    };
    
    await updateSpecificTaskPerformance(uid, taskId, defaultPerformanceData);
    console.log(`[useTaskPerformance] Initialized default performance data for TaskID:`, taskId);
    return defaultPerformanceData;
  }, [uid]);
  
  // Function to fetch the performance data for a specific task
  const fetchPerformance = useCallback(async (taskId) => {
    try {
      const data = await getSpecificTaskPerformance(uid, taskId);
      console.log("[useTaskPerformance] Fetched performance data:", JSON.stringify(data));
      
      if (!data) {
        return await initializeTaskPerformance(taskId);
      }
      
      return data;
    } catch (error) {
      console.log("[useTaskPerformance] Error fetching data:", error.message);
      console.log("[useTaskPerformance] No existing data for this task, initializing...");
      return await initializeTaskPerformance(taskId);
    }
  }, [uid, initializeTaskPerformance]);

  // Function to save the performance data for a specific task and record the event
  const savePerformance = useCallback(async (taskId, key, value) => {
    console.log("[useTaskPerformance] Saving performance. TaskID:", taskId, "Key:", key, "Value:", value);
    
    // Save performance data
    await updateSpecificTaskPerformance(uid, taskId, { [key]: value });
    
    // Record the task event
    if (['completed', 'skipped'].includes(key)) {
      await recordTaskEvent(uid, taskId, key);
      console.log(`[useTaskPerformance] Recorded ${key} event for TaskID:`, taskId);
    }
    
  }, [uid]);

  return { fetchPerformance, savePerformance };
};

export default useTaskPerformance;
