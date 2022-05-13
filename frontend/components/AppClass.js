import React from 'react'

export default class AppClass extends React.Component {
  state = {
    coordinates: "(2, 2)",
    moves: 0,
    x: 2,
    y: 2,
    email: "",
    grid: ["", "", "", "", "B", "", "", "", ""]
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.state.coordinates}</h3>
          <h3 id="steps">You moved {this.state.moves} times</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((element, i) => <div key={i} className="square">{element}</div>)}
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
