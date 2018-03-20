import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainPage from './components/MainPage'
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <MainPage />
      </MuiThemeProvider>
    )
  }
}
export default App
