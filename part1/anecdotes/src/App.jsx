import { useState } from 'react'


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
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const handleVote = () => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [selected]: (prevVotes[selected]||0) + 1
    }))
  }

const  highestVotes = (votes) => {
    if(Object.keys(votes).length === 0)
      return {}
      
    let maxKey = null;
    let maxValue = -Infinity

    for(let key in votes){
      if(votes[key] > maxValue){
        maxValue = votes[key]
        maxKey = key
      }
    }
    return {key: maxKey, value: maxValue}
}

const handleNextAnecdote = () => {
  const randomAnecdote = Math.floor(Math.random()*anecdotes.length);
  setSelected(randomAnecdote);
}

const winner = highestVotes(votes);

const currentVotes = votes[selected] || 0;

const winnerVotes = winner.value;


 

  return (
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} votes={currentVotes}/>
        <div style={{display: 'flex', gap:10}}>
        <Button text='next anecdote' onNext={handleNextAnecdote}/>
        <Vote text='vote' onVote={handleVote}/>
        </div>
        <div>
          <MostVotedAnecdote votes={votes} anecdote={anecdotes[winner.key]} winvotes={winnerVotes}/>
          
        </div>
      </div>
  )
}


const Button = ({onNext, text}) => {
  return(
    <button onClick={onNext}>{text}</button>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return(
      <div>
      <p>"{anecdote}"</p>
      <p>Has {votes} vote{votes !== 1 ? 's' : ''}</p>
      </div>
  )
}

const MostVotedAnecdote = ({votes, anecdote, winvotes}) => {
  if(Object.keys(votes).length === 0){
    return(
      <p>No Votes</p>
    )
  }
  return(
    <div>
    <h1></h1>
    <p>"{anecdote}"</p>
    <p>Has {winvotes} vote{winvotes !== 1 ? 's' : ''}</p>
    </div>
  )
}

const Vote = ({onVote, text}) => {
  return(
    <div>
      <button onClick={onVote}>{text}</button>
    </div>
  )
}

export default App
