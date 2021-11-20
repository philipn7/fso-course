import React, { useState } from 'react';

const Button = ({ text, handler }) => {
  return <button onClick={handler}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  <h1>statistics</h1>;
  if (good || neutral || bad)
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good + neutral + bad} />
            <StatisticLine text="average" value={(good + bad * -1) / (good + neutral + bad)} />
            <StatisticLine text="positive" value={good / (good + neutral + bad)} />
          </tbody>
        </table>
      </div>
    );
  return (
    <div>
      <div>No feedback given</div>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClickHandler = () => setGood(good + 1);
  const neutralClickHandler = () => setNeutral(neutral + 1);
  const badClickHandler = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handler={goodClickHandler} />
      <Button text="neutral" handler={neutralClickHandler} />
      <Button text="bad" handler={badClickHandler} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
