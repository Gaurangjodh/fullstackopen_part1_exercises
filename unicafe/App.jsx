import { useState } from 'react'

const Button = (props) =>{
  return(
  <button onClick={props.onHandle}>{props.text}</button>
)}

const Statistics = (props) =>{
  console.log('Working')
  return(
    <table>
      <th></th>
    <StatisticLine text='good' value={props.good}/>
    <StatisticLine text='neutral' value={props.neutral}/>
    <StatisticLine text='bad' value={props.bad}/>
    <StatisticLine text='all' value={props.all}/>
    <StatisticLine text='average' value={props.average}/>
    <StatisticLine text='positive' value={props.positive} sign='%'/>
    </table>
  )
}

const StatisticLine = (props) =>{
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.sign}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const onGoodFeedback = () =>{
    const updatedGood = good+1
    setGood(updatedGood)
    const updatedAll = updatedGood+bad+neutral
    setAll(updatedAll)
    setAvg((updatedGood-bad)/updatedAll)
    setPositive((updatedGood/updatedAll*100).toFixed(1))
    console.log('Updated good ',updatedGood)
  }
  const onNeutralFeedback = () =>{
    const updatedNeutral = neutral+1
    setNeutral(updatedNeutral)
    const updatedAll = good+bad+updatedNeutral
    setAll(updatedAll)
    setPositive((good/updatedAll*100).toFixed(1))
  }
  const onBadFeedback = () =>{
    const updatedBad = bad+1
    setBad(updatedBad)
    const updatedAll = good+updatedBad+neutral
    setAll(updatedAll)
    setAvg((good-updatedBad)/updatedAll)
    setPositive((good/updatedAll*100).toFixed(1))
  }
  return (
    <>
      <div>
      <h1>give feedback</h1>
      <Button onHandle={onGoodFeedback} text='good'/>
      <Button onHandle={onNeutralFeedback} text='neutral'/>
      <Button onHandle={onBadFeedback} text='bad'/>
      </div>
      <h1>Statistics</h1>
      {all!=0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
      )
      :(
        <p>No feedback given</p>
      )}
    </>
  )
}

export default App
