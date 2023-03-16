import { useState } from "react";

const goodFeedback = "good";
const neutralFeedback = "neutral";
const badFeedback = "bad";
const allFeedbacks = "all";
const averageFeedback = "average";
const positiveFeedback = "positive";

const StatisticLine = (props) => {
  return (
    <>
      <p>
        {props.text} {props.value}
      </p>
    </>
  );
};

const Statistics = (props) => {
  return (
    <>
      <StatisticLine text={goodFeedback} value={props.good} />
      <StatisticLine text={neutralFeedback} value={props.neutral} />
      <StatisticLine text={badFeedback} value={props.bad} />
      <StatisticLine text={allFeedbacks} value={props.all} />
      <StatisticLine text={averageFeedback} value={props.average} />
      <StatisticLine
        text={positiveFeedback}
        value={props.positive * 100 + "%"}
      />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodFeedback = () => {
    const updatedGoodFeedback = good + 1;
    setGood(updatedGoodFeedback);
    setAll(updatedGoodFeedback + neutral + bad);
    setAverage((updatedGoodFeedback + neutral + bad) / 3);
    setPositive(updatedGoodFeedback / (updatedGoodFeedback + neutral + bad));
  };

  const handleNeutralFeedback = () => {
    const updatedNeutralFeedback = neutral + 1;
    setNeutral(updatedNeutralFeedback);
    setAll(updatedNeutralFeedback + good + bad);
    setAverage((updatedNeutralFeedback + good + bad) / 3);
    setPositive(good / (updatedNeutralFeedback + good + bad));
  };

  const handleBadFeedback = () => {
    const updatedBadFeedback = bad + 1;
    setBad(updatedBadFeedback);
    setAll(updatedBadFeedback + good + neutral);
    setAverage((updatedBadFeedback + good + neutral) / 3);
    setPositive(good / (updatedBadFeedback + good + neutral));
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodFeedback}>{goodFeedback}</button>
      <button onClick={handleNeutralFeedback}>{neutralFeedback}</button>
      <button onClick={handleBadFeedback}>{badFeedback}</button>

      <h1>Statistics</h1>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
