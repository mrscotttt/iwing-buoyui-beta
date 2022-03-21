import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./components/main"
//import Mappage from "./components/map"
import Energy from './components/energy';
import Mymap2 from "./components/map2"
import Chrt from "./components/main2"
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
                <Route path="/map" component={Mymap2} />
                <Route path="/energy" component={Energy} />
                <Route path="/chart" component={Chrt} />
            </Switch>
        </main>
    )
}

export default App;