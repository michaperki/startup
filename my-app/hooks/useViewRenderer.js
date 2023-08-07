import React from "react";
import { Text } from "react-native";
import Overview from "../pages/Overview";
import Daily from "../pages/Daily";

export const VIEW_TYPES = {
  OVERVIEW: "overview",
  TODAY: "today",
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
      default:
        return null;
    }
  };

  return contentRenderer;
};

export default useViewRenderer;
