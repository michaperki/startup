import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Daily from '../pages/Daily';

describe('Daily', () => {
  const mockScore = 10;
  const mockTasks = [
    { description: 'Task 1', points: { complete: 5, skip: -3 } },
    { description: 'Task 2', points: { complete: 3, skip: -2 } }
  ];
  const mockTaskLists = ['Routine 1', 'Routine 2'];
  const mockOnSelect = jest.fn();

  it('renders the core components and text', () => {
    const { getByText } = render(
      <Daily
        score={mockScore}
        tasks={mockTasks}
        taskLists={mockTaskLists}
        onSelect={mockOnSelect}
      />
    );

    expect(getByText('Daily View')).toBeTruthy();
    expect(getByText('Current Routine:')).toBeTruthy();
    // Other components will be rendered as well, like Score, DailyOutcome, and RoutineSelector,
    // but we won't validate their inner behavior here since they should have their own unit tests.
  });

  it('computes and displays the correct highScore and lowScore', () => {
    const { getByText } = render(
      <Daily
        score={mockScore}
        tasks={mockTasks}
        taskLists={mockTaskLists}
        onSelect={mockOnSelect}
      />
    );

    // From our mock data: highScore = 10 + 5 + 3 = 18 and lowScore = 10 - 3 - 2 = 5
    expect(getByText('18')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('displays the tasks from the current routine', () => {
    const { getByText } = render(
      <Daily
        score={mockScore}
        tasks={mockTasks}
        taskLists={mockTaskLists}
        onSelect={mockOnSelect}
      />
    );

    expect(getByText('Task 1: Task 1')).toBeTruthy();
    expect(getByText('Task 2: Task 2')).toBeTruthy();
  });

  // If the RoutineSelector or other components have interactive behavior that affects the parent Daily component, 
  // you would test that here. For instance, if selecting a routine in RoutineSelector changes the displayed tasks.
});

