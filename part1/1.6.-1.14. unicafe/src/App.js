import { useState } from "react";

const goodFeedback = "good";
const neutralFeedback = "neutral";
const badFeedback = "bad";

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

  const handleGoodFeedback = () => {
    const updatedGoodFeedback = good + 1;
    setGood(updatedGoodFeedback);
  };

  const handleNeutralFeedback = () => {
    const updatedNeutralFeedback = neutral + 1;
    setNeutral(updatedNeutralFeedback);
  };

  const handleBadFeedback = () => {
    const updatedBadFeedback = bad + 1;
    setBad(updatedBadFeedback);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodFeedback}>{goodFeedback}</button>
      <button onClick={handleNeutralFeedback}>{neutralFeedback}</button>
      <button onClick={handleBadFeedback}>{badFeedback}</button>

      <h1>Statistics</h1>
      <Feedback text={goodFeedback} number={good} />
      <Feedback text={neutralFeedback} number={neutral} />
      <Feedback text={badFeedback} number={bad} />
    </div>
  );
};

export default App;
