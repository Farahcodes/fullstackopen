import { useState } from "react";

const goodFeedback = "good";
const neutralFeedback = "neutral";
const badFeedback = "bad";

const Button = (props) => {
  return <button>{props.text}</button>;
};

const GiveFeedback = (props) => {
  return (
    <>
      <h1>Give Feedback</h1>
      <Button text={goodFeedback} />
      <Button text={neutralFeedback} />
      <Button text={badFeedback} />
    </>
  );
};

const Feedback = (props) => {
  return (
    <>
      <p>
        {props.text} {props.number}
      </p>
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
      <h1>Statistics</h1>
      <Feedback text={goodFeedback} number={good} />
      <Feedback text={neutralFeedback} number={neutral} />
      <Feedback text={badFeedback} number={bad} />
    </div>
  );
};

export default App;
