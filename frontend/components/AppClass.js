import React from 'react'
import axios from 'axios'


const URL = "http://localhost:9000/api/result"

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    steps: 0,
    email: "",
    squares: ["", "", "", "", "B", "", "", "", ""],
    message: "",
    active: false
  }


  handleClick = (direction) => {
    if(direction === "right" && this.state.x < 3){
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: this.state.x + 1,
        squares: this.state.squares.map((square, idx) => {
          if (square === "B") {
            return ""
          } else if (this.state.squares[idx - 1] === "B") {
            return "B"
          }
        }),
        message: ""
      })
    } else if (direction === "left" && this.state.x > 1) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        x: this.state.x - 1,
        squares: this.state.squares.map((square, idx) => {
          if (square === "B") {
            return ""
          } else if (this.state.squares[idx + 1] === "B") {
            return "B"
          }
        }),
        message: ""
      })
    } else if (direction === "up" && this.state.y > 1) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        y: this.state.y - 1,
        squares: this.state.squares.map((square, idx) => {
          if (square === "B") {
            return ""
          } else if (this.state.squares[idx + 3] === "B") {
            return "B"
          }
        }),
        message: ""
      })
    } else if (direction === "down" && this.state.y < 3) {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        y: this.state.y + 1,
        squares: this.state.squares.map((square, idx) => {
          if (square === "B") {
            return ""
          } else if (this.state.squares[idx - 3] === "B") {
            return "B"
          }
        }),
        message: ""
      })
    } else if (direction === "reset") {
      this.setState({
        ...this.state,
        x: 2,
        y: 2,
        steps: 0,
        email: "",
        squares: ["", "", "", "", "B", "", "", "", ""],
        message: "",
      })
      document.querySelector("#email").value = ""
    } else {
      this.setState({
        ...this.state,
        message: `You can't go ${direction}`
      })
    }
  }

  handleChange = (evt) => {
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const newPost = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: this.state.email
    }
    axios.post(URL, newPost)
    .then(res => {
      this.setState({
        ...this.state,
        message: res.data.message,
        email: ""
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        message: err.response.data.message
      })
      
    })
    document.querySelector("#email").value = ""
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {`(${this.state.x}, ${this.state.y})`}</h3>
          <h3 id="steps">{this.state.steps === 1 ? `You moved ${this.state.steps} time` : `You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {this.state.squares.map((square, i) => (
            <div key={i} className={square ? "square active" : "square"}>{square}</div>))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.handleClick("left")}>LEFT</button>
          <button id="up" onClick={() => this.handleClick("up")}>UP</button>
          <button id="right" onClick={() => this.handleClick("right")}>RIGHT</button>
          <button id="down" onClick={() => this.handleClick("down")}>DOWN</button>
          <button id="reset" onClick={() => this.handleClick("reset")}>reset</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.handleChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
