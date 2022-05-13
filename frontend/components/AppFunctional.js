import React, { useState } from 'react'
import axios from 'axios'

const URL = "http://localhost:9000/api/result"

export default function AppFunctional(props) {
  const [state, setState] = useState({
    x: 2,
    y: 2,
    steps: 0,
    email: "",
    squares: ["", "", "", "", "B", "", "", "", ""],
    message: "",
    active: false
  })

  const handleClick = (direction) => {
    if(direction === "right" && state.x < 3){
      setState({
        ...state,
        steps: state.steps + 1,
        x: state.x + 1,
        squares: state.squares.map((square, idx) => {
          if (square === "B") {
            return ""
          } else if (state.squares[idx - 1] === "B") {
            return "B"
          }
        }),
        message: ""
      })
    } else if (direction === "left" && state.x > 1) {
      setState({
        ...state,
        steps: state.steps + 1,
        x: state.x - 1,
        squares: state.squares.map((square, idx) => {
          if (square === "B") {
            return ""
          } else if (state.squares[idx + 1] === "B") {
            return "B"
          }
        }),
        message: ""
      })
    } else if (direction === "up" && state.y > 1) {
      setState({
        ...state,
        steps: state.steps + 1,
        y: state.y - 1,
        squares: state.squares.map((square, idx) => {
          if (square === "B") {
            return ""
          } else if (state.squares[idx + 3] === "B") {
            return "B"
          }
        }),
        message: ""
      })
    } else if (direction === "down" && state.y < 3) {
      setState({
        ...state,
        steps: state.steps + 1,
        y: state.y + 1,
        squares: state.squares.map((square, idx) => {
          if (square === "B") {
            return ""
          } else if (state.squares[idx - 3] === "B") {
            return "B"
          }
        }),
        message: ""
      })
    } else if (direction === "reset") {
      setState({
        ...state,
        x: 2,
        y: 2,
        steps: 0,
        email: "",
        squares: ["", "", "", "", "B", "", "", "", ""],
        message: "",
      })
    } else {
      setState({
        ...state,
        message: `You can't go ${direction}`
      })
    }
  }

  const handleChange = (evt) => {
    setState({
      ...state,
      email: evt.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newPost = {
      x: state.x,
      y: state.y,
      steps: state.steps,
      email: state.email
    }
    axios.post(URL, newPost)
    .then(res => {
      setState({
        ...state,
        message: res.data.message,
        email: ""
      })
    })
    
  }

  return (
    <div id="wrapper" className={props.className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {`(${state.x}, ${state.y})`}</h3>
          <h3 id="steps">You moved {state.steps} times</h3>
        </div>
        <div id="grid">
          {state.squares.map((square, i) => (
            <div key={i} className={square ? "square active" : "square"}>{square}</div>))}
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => handleClick("left")}>LEFT</button>
          <button id="up" onClick={() => handleClick("up")}>UP</button>
          <button id="right" onClick={() => handleClick("right")}>RIGHT</button>
          <button id="down" onClick={() => handleClick("down")}>DOWN</button>
          <button id="reset" onClick={() => handleClick("reset")}>reset</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={handleChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
  )
}
