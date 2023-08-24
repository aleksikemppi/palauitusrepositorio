import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const good_click = () => setGood(good + 1)
  const neutral_click = () => setNeutral(neutral + 1)
  const bad_click = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={good_click} text='good' />
      <Button handleClick={neutral_click} text='neutral' />
      <Button handleClick={bad_click} text='bad' />
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>      
      </>
    )
  }  
    
  return (
      <div>
        <StatisticsLine text='good' value={good} />
        <StatisticsLine text='neutral' value={neutral} />
        <StatisticsLine text='bad' value={bad} />
        <StatisticsLine text='all' value={all} />
        <StatisticsLine text='average' value={average} />
        <StatisticsLine text='positive' value={positive} />
      </div>  
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick = {handleClick}>
    {text}
  </button> 
)

const StatisticsLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )  
}

export default App