import React, { Component } from "react";
import Task from "./Task";
import "./TaskList.css";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTaskIndex: 0,
    };
  }

  completeTask = (task) => {
    this.setState((prevState) => ({
      currentTaskIndex: prevState.currentTaskIndex + 1,
    }));
    this.props.completeTask(task);
  };

  skipTask = (task) => {
    this.setState((prevState) => ({
      currentTaskIndex: prevState.currentTaskIndex + 1,
    }));
    this.props.skipTask(task);
  };

  render() {
    const { tasks } = this.props;
    const { currentTaskIndex } = this.state;
    const task = tasks[currentTaskIndex];

    return (
      <div className="TaskList">
        {task ? (
          <Task task={task} completeTask={this.completeTask} skipTask={this.skipTask} />
        ) : (
          <div>No more tasks</div>
        )}
      </div>
    );
  }
}

export default TaskList;

