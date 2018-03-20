import React, { Component } from 'react'
import TopBar from './TopBar'
import Editer from './Editer'
class MainPage extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <Editer />
        <div className="footer">
          <p>Inspired by crypto-js</p>
          <p>Created by Eric</p>
        </div>
      </div>
    )
  }
}
export default MainPage
