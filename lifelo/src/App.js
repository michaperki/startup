import React, { Component } from "react";
import Lifelo from "./components/Lifelo";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import tasks from "./utils/tasks";

// App is the top level component
// It is the parent of all other components
// App keeps track of the lifelo of the user
// App passes the lifelo to the Navbar and Lifelo components
// App passes the addLifelo function to the Lifelo component
// App keeps track of the tasks
// App passes the tasks to the Tasks component
// App passes the completeTask function to the Tasks component
//    when the user completes a task, the completeTask function is called
//    the completeTask function updates the tasks
//    the completeTask function updates the lifelo by adding the points of the completed task to the lifelo
// Tasks cannot be added or deleted or edited
// Tasks can be completed but not uncompleted or completed more than once
// Tasks are displayed in the Tasks component

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lifelo: 0,
      tasks: tasks,
    };
  }

  addLifelo = () => {
    this.setState({
      lifelo: this.state.lifelo + 1,
    });
  };

  completeTask = (task) => {
    if (task.completed) {
      alert("You have already completed this task");
    } else {
      task.completed = true;
      this.setState({
        lifelo: this.state.lifelo + task.points,
      });
    }
  };

  skipTask = (task) => {
    if (task.completed) {
      alert("You have already completed this task");
    } else {
      this.setState({
        lifelo: this.state.lifelo - task.points,
      });
    }
  };

  resetTasks = () => {
    tasks.forEach((task) => {
      task.completed = false;
    });
    this.setState({
      tasks: tasks,
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar lifelo={this.state.lifelo} />
        <Lifelo lifelo={this.state.lifelo} addLifelo={this.addLifelo} />
        <TaskList tasks={this.state.tasks} completeTask={this.completeTask} skipTask={this.skipTask} />
        <button onClick={this.resetTasks}>Reset Tasks</button>
      </div>
    );
  }
}

export default App;
