import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './styles/index.css'
const store = configureStore()
const crypto_bot = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(crypto_bot, document.getElementById('root'))
