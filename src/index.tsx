import React from 'react'
import ReactDOM from 'react-dom'

import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import App from './App'
import './scss/main.scss'
import * as serviceWorker from './serviceWorker'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { MoralisProvider } from 'react-moralis';
import Landing from './pages/Landing';

// const appId = "GP48ud1cD27gHPTjMtn6LlJdbC2CwmT82ZnI0sGS" //ropsten???
// const serverUrl = "https://ijvbdf4adeyg.moralis.io:2053/server"

const appId = "sJH8z1skIkqg5FiQaETHjsUryA8aeT47b1DK0R5a" //rinkeby
const serverUrl = "https://2zcf5kqjhrv2.moralis.io:2053/server"


const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
})



ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
            <Route exact path="/" children={<Landing />} />
            <Route path="/app" children={<App />} />
            <Route path="/:tokenAddress" children={<App />} />
            <Route path="/:tokenAddress/:invoiceNo" children={<App />} />
        </Switch>
      </Router>
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
