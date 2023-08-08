import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Overview from "../pages/Overview";
// Mocking the children components to make testing the parent component (Overview) easier
import { Text } from 'react-native';

jest.mock("../components/Score", () => {
  const { Text } = require('react-native');
  return () => <Text>MockedScore</Text>;
});
jest.mock("../components/TaskList", () => {
  return jest.fn(({ onTaskComplete, onTaskSkip, tasks }) => {
    onTaskComplete(tasks[0].id); // Automatically call on render for testing
    onTaskSkip(tasks[0].id); // Automatically call on render for testing
    return null;
  });
});
describe("Overview Component", () => {
  it("renders correctly", () => {
    const mockProps = {
      score: 100,
      tasks: [{ id: "1", description: "Test Task" }],
      taskIndex: 0,
      onTaskComplete: jest.fn(),
      onTaskSkip: jest.fn(),
    };

    const { getByText } = render(<Overview {...mockProps} />);

    // Check if Score is rendered
    expect(getByText("MockedScore")).toBeTruthy();

    // This can be extended to include other expected behaviors or rendering conditions
  });

  it("calls the onTaskComplete and onTaskSkip callbacks when tasks are interacted with", () => {
    const mockProps = {
      score: 100,
      tasks: [{ id: "1", description: "Test Task" }],
      taskIndex: 0,
      onTaskComplete: jest.fn(),
      onTaskSkip: jest.fn(),
    };

    render(<Overview {...mockProps} />);

    expect(mockProps.onTaskComplete).toHaveBeenCalledWith(
      mockProps.tasks[0].id
    );
    expect(mockProps.onTaskSkip).toHaveBeenCalledWith(mockProps.tasks[0].id);
  });
});
