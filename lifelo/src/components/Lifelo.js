import React, { Component } from "react";
import "./Lifelo.css";
import { animated } from "@react-spring/web";
import { useSpring } from "@react-spring/core";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
}

// how can I remove the decimals from the animation?
// answer: add .toFixed inside the number.to function
// the number.to function is located inside the return statement

class Lifelo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevLifelo: props.lifelo, // Store the previous lifelo score
    };
  }

  componentDidUpdate(prevProps) {
    // Check if the lifelo score prop has changed
    if (prevProps.lifelo !== this.props.lifelo) {
      this.setState({ prevLifelo: prevProps.lifelo });
    }
  }

  render() {
    const { lifelo } = this.props;
    const { prevLifelo } = this.state;

    // Determine if the score has increased or decreased to apply the correct color class
    const colorClass = lifelo > prevLifelo ? "Lifelo-green" : "Lifelo-red";

    return (
      <div className={`Lifelo ${colorClass}`}>
        {/* Display the lifelo score */}
        <Number n={lifelo} />
      </div>
    );
  }
}

export default Lifelo;

