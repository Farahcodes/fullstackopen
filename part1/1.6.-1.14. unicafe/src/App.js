import { useState } from "react";

const goodFeedback = "good";
const neutralFeedback = "neutral";
const badFeedback = "bad";
const allFeedbacks = "all";
const average = "average";
const positive = "positive";

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
  const [all, setAll] = useState(0);

  const handleGoodFeedback = () => {
    const updatedGoodFeedback = good + 1;
    setGood(updatedGoodFeedback);
    setAll(updatedGoodFeedback + neutral + bad);
  };

  const handleNeutralFeedback = () => {
    const updatedNeutralFeedback = neutral + 1;
    setNeutral(updatedNeutralFeedback);
    setAll(updatedNeutralFeedback + good + bad);
  };

  const handleBadFeedback = () => {
    const updatedBadFeedback = bad + 1;
    setBad(updatedBadFeedback);
    setAll(updatedBadFeedback + good + neutral);
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
      <Feedback text={allFeedbacks} number={all} />
    </div>
  );
};

export default App;
