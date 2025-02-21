import { useState } from 'react'


function App() {
  const course = {
      name:  'Half stack application development',
      parts: [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]
}

   return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
  </div>
  )
}

function Header(props){
  console.log(props)
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}
 
function Content(props){
  console.log(props)
  return(
    <div>
       <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises}/>
       <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises}/>
       <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises}/>
    </div>
  )
}

function Part(props){
  return(
    <div>
      <p>{props.part}{props.exercises}</p>
    </div>
  )
}

function Total(props){
  return(
    <div>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
  ) 
}

export default App
