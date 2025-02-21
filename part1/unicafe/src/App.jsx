import { useState } from 'react'


function App() {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [all, setAll] = useState(0)

  const average = all === 0 ? 0 : ((good*1 + neutral*0 + bad*-1)/all).toFixed(2);
  console.log(average);

  const positive = all === 0 ? 0 : ((good/all)*100).toFixed(2);
  console.log(positive);

  const handleGoodClick = () =>{
    setGood(good+1)
    const newTotal = all + 1
    setAll(newTotal)
  }
  const handleBadClick = () =>{
    setBad(bad+1)
    const newTotal = all + 1
    setAll(newTotal)
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral+1)
    const newTotal = all + 1
    setAll(newTotal)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{display:"flex", gap:"10px"}}>
      <Button 
      onClick={handleGoodClick}
      text='Good'
      />
      <Button 
      onClick={handleBadClick}
      text='Bad'
      />
      <Button 
      onClick={handleNeutralClick}
      text='Neutral'
      />
      </div>
      <Statistics 
      good={good}
      bad={bad}
      neutral={neutral}
      all={all}
      average={average}
      positive={positive}
      />
    </div>
   
  )
}

function Statistics(props){

  if(!props.good && !props.bad && !props.neutral){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <StatisticsLine text='good' value={props.good}/>
          <StatisticsLine text='bad' value={props.bad}/>
          <StatisticsLine text='neutral' value={props.neutral}/>
          <StatisticsLine text='all' value={props.all}/>
          <StatisticsLine text='average' value={props.average}/>
          <StatisticsLine text='positive' value={props.positive}/>
        </tbody>
      </table>
    </div>
  )
}

function Button({onClick, text}){
  return(
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

function StatisticsLine({text, value}){
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  
  )
}




export default App
