import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './scss/main.scss'
import * as serviceWorker from './serviceWorker'
import { MoralisProvider } from 'react-moralis';

const appId = ""
const serverUrl = ""

ReactDOM.render(
  <React.StrictMode>
     <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
