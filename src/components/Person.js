import React from 'react'
import './Person.css'


const Person = (props) => {
  const style = { 
    backgroundColor: 'white',
    font: 'inherit', 
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  }

  return (
    <div className="Person" style={style}>
      <h2 onClick={props.handlerShuffle}>{props.string} {props.number}</h2>
      <p>{props.children}</p>
      <input type="text" onChange={props.handlerChange} value={props.string} />
    </div>
    
  )
}

export default Person