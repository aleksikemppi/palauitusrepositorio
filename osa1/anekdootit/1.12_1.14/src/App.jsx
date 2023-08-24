import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [set_anecdote, anecdote] = useState(0)
  const [points, Votes] = useState(new Array(8).fill(0))
  const sum = [...points]
  
  const rand = () => {
    anecdote(Math.floor(anecdotes.length * Math.random()))
  }
  const manageVotes = () => {
    sum[set_anecdote] += 1
    Votes(sum)
  }
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[set_anecdote]}
      <br></br>
      <p>has {points[set_anecdote]} votes</p>
      <Button handleClick = {manageVotes} 
      text='vote'/>
      <Button handleClick = {rand} 
      text='next anecdote'/>
      <h2>Anecdote with the most votes</h2>
      <MostVoteecdote points = {points} anecdotes = {anecdotes}/>
    </div>
  )
}

const MostVoteecdote = (props) => {
  return (
    <div>
      <p>{props.anecdotes[props.points.indexOf(Math.max(...props.points))]}</p>
      <p>has {(Math.max(...props.points))} votes</p>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App;