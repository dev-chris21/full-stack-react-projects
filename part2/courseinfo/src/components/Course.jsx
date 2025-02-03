const Course =({course})=>{
    return (
        <div>
            <Header header={course[0].name}/>
            <Content course ={course[0]}/>
            <Header header={course[1].name}/>
            <Content course={course[1]}/>
        </div>
    )
}

const Content = ({course}) => {
    return (
        <div>
            <ul style={{listStyleType:'none', padding:'0'}}>
            <Part course={course}/>
            </ul>
            <Total course={course}/>
        </div>
    )
}

const Part = ({course}) => {
    const p = course.parts
    return (
        <div>
            {p.map(part =>
            <li key={part.id}>
                {part.name} {part.exercises}
            </li>
            )}
        </div>
    )
}

const Header = ({header}) => {
    return (
        <div>
            <h1>{header}</h1>
        </div>
    )
}

const Total = ({course}) => {
    const ap = course.parts
    const sum = ap.reduce((t, p) => t + p.exercises, 0)
    console.log(sum)
    return (
        <div>
            <h4>Total of {sum} exercises</h4>
        </div>
    )
}

export default Course