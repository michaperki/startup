// Path: src/components/Task.js
import React, { Component } from "react";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
    };
  }

  componentDidUpdate(prevProps) {
    // Check if the task prop has changed to a new task
    if (prevProps.task !== this.props.task) {
      this.setState({ completed: false }); // Reset completed state when a new task is passed
    }
  }

  handleCompleteTask = () => {
    this.setState({ completed: true });
    setTimeout(() => {
      this.props.completeTask(this.props.task);
    }, 1000); // Adjust the time to match your CSS transition duration
  };

  handleSkipTask = (event) => {
    event.stopPropagation();
    this.props.skipTask(this.props.task);
  };

  render() {
    const { task } = this.props;
    const { completed } = this.state;

    return (
      <>
        <div
          className={`Task ${completed ? "completed" : ""}`}
          style={{ opacity: completed ? 0 : 1 }}
          onClick={this.handleCompleteTask}
        >
          <div className="Task-title">{task.title}</div>
          <div className="Task-points">{task.points}</div>
          <button onClick={this.handleSkipTask}>Skip this task</button>
        </div>
      </>
    );
  }
}

export default Task;
