import { useState } from 'react'

const Statistics = ( { good, neutral, bad} ) => {
  const total = good + neutral + bad;
  const average = (good-bad) / total;
  const positive = ((good / total) * 100);

  if (total > 0) {
    return (
        <table>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={total}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive + " %"}/>
          </tbody>
        </table>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}

const StatisticLine = ( { text, value} ) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
    )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setneutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  
  const handleNeutral = () => setneutral(neutral + 1)

  const handleBad = () => setBad(bad + 1)
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>)
}

export default App
