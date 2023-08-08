import React from "react";
import { Text } from "react-native";
import Overview from "../pages/Overview";
import Daily from "../pages/Daily";
import Stats from "../pages/Stats";

export const VIEW_TYPES = {
  OVERVIEW: "overview",
  TODAY: "today",
  STATS: "stats",
};

const useViewRenderer = (
  view,
  loading,
  error,
  score,
  taskLists,
  tasks,
  taskIndex,
  handlePerformanceUpdate,
  selectRoutine
) => {
  const LoadingComponent = () => <Text>Loading tasks...</Text>;
  const ErrorComponent = () => (
    <Text>Error loading tasks. Please try again later.</Text>
  );

  const contentRenderer = () => {
    if (loading) return <LoadingComponent />;
    if (error) return <ErrorComponent />;

    const sharedProps = {
      score,
      onTaskComplete: () => handlePerformanceUpdate("completed"),
      onTaskSkip: () => handlePerformanceUpdate("skipped"),
    };

    switch (view) {
      case VIEW_TYPES.OVERVIEW:
        return (
          <Overview
            {...sharedProps}
            tasks={tasks}
            taskIndex={taskIndex}
          />
        );
      case VIEW_TYPES.TODAY:
        return (
          <Daily
            {...sharedProps}
            task={tasks[taskIndex]}
            taskLists={taskLists}
            onSelect={selectRoutine}
            tasks={tasks}

          />
        );
      case VIEW_TYPES.STATS:
        return <Stats />;
      default:
        return null;
    }
  };

  return contentRenderer;
};

export default useViewRenderer;
