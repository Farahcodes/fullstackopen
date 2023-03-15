import { useState } from "react";

const good = "good";
const neutral = "neutral";
const bad = "bad";

const Button = (props) => {
  return <button>{props.text}</button>;
};

const GiveFeedback = (props) => {
  return (
    <>
      <h1>Give Feedback</h1>
      <Button text={good} />
      <Button text={neutral} />
      <Button text={bad} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <GiveFeedback />
    </div>
  );
};

export default App;
