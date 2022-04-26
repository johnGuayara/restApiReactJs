import React from "react";
import Rest from './components/pages/Rest';
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

function App(){
  return(
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="" component={Rest}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
