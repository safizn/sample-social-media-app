import React, { useState } from 'react';
import './App.css';
import Person from './components/Person.js'

const App = () => { 
  let [state, setState] = useState({
    persons: [
      { string: 'X', number: 1 },
      { string: 'Y', number: 2 },
      { string: 'Z', number: 3 },
    ]
  })

  const shuffleHandler = (newString) => {
    newString = newString || 'W'
    setState({ persons: [
        { string: 'X', number: 1 },
        { string: newString, number: 2 },
        { string: 'Z', number: 3 },
      ] 
    })
  }

  const changeHandler = (event) => {
    setState({ persons: [
        { string: 'X', number: 1 },
        { string: event.target.value, number: 2 },
        { string: 'Z', number: 3 },
      ] 
    })
  }

  return (
    <div className="App">
      <h1>text</h1>
      <h1>Another text</h1>
      <button onClick={() => shuffleHandler('Q')}>button</button>
      <Person handlerShuffle={shuffleHandler.bind(this, 'P')} string={state.persons[0].string} number={state.persons[0].number} />
      <Person handlerChange={changeHandler} string={state.persons[1].string} number={state.persons[1].number} />
      <Person string={state.persons[2].string} number={state.persons[2].number} />
    </div>
  )
}

export default App;
