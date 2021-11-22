import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const nextHandler = () => {
    let newSelection = selected;
    while (newSelection === selected) {
      newSelection = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(newSelection);
  };

  const voteHandler = () => {
    const votesCpy = [...votes];
    votesCpy[selected] += 1;
    setVotes(votesCpy);
  };

  const highestAncedote = () => {
    const highest = Math.max(...votes);
    return votes.findIndex((elem) => {
      return elem >= highest;
    });
    // return votes.reduce((h, elem, idx) => {
    //   console.log('hello', h, elem, idx);
    //   if (elem === highest) {
    //     return idx;
    //   }
    //   return h;
    // }, 0);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={voteHandler}>vote</button>
      <button onClick={nextHandler}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[highestAncedote()]}</div>
      <div> has {Math.max(...votes)} votes</div>
    </div>
  );
};

export default App;
