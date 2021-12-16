import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/main"
import MyMap from "./components/map"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
    
    return (
        <main>
            <Switch>
                <Route path="/main" component={Main} exact />
                <Route path="/map" component={MyMap} />
            </Switch>
        </main>
    )
}

export default App;