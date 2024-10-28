import { useState } from 'react'

const Button = (props) => (  
  <button onClick={props.handleClick}>{props.text}</button>
  )

const MostVotes = ({ points, anecdotes }) => {

  const max = Math.max(...points);
  const idx_max = points.indexOf(max);

  return (
    <Display anecdote={anecdotes[idx_max]} votes={max}/>
  )
}

const Display = ({ anecdote, votes}) => (
  <div>
    <div>{anecdote}</div>
    <div>has {votes} votes</div>
  </div>
  )

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const nextAnecdote = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random);
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdote={anecdotes[selected]} votes={points[selected]}/>
      <Button handleClick={vote} text="vote"/>
      <Button handleClick={nextAnecdote} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <MostVotes points={points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App