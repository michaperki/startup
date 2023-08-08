import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskButton from "../components/TaskButton";

jest.mock('react-native-really-awesome-button', () => {
  return jest.fn(({ children, onPress, ...props }) => {
    return (
      <button onClick={onPress} {...props}>
        {children}
      </button>
    );
  });
});

describe("TaskButton", () => {
  const mockTask = {
    id: "1234",
    description: "Task Description",
  };

  it("renders correctly", () => {
    const { getByText } = render(
      <TaskButton task={mockTask} onComplete={jest.fn()} onSkip={jest.fn()} />
    );

    expect(getByText(mockTask.description)).toBeTruthy();
    expect(getByText("Skip")).toBeTruthy();
  });

  // ... Your other tests ...
});
