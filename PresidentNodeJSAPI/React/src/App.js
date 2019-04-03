import React, { Component } from 'react';
import './App.css';
import axios from "axios";

import PresidentList from "./components/PresidentList";

class App extends Component {

    constructor(props) {
      super(props)
      this.state = {
        presidents: [],
        sort: 'ASC',
      }; 
      this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(e) {
      e.preventDefault()
      if(this.state.sort === "ASC"){
        this.setState({
          sort : 'DESC'
         })
      } else {
        this.setState({
          sort : 'ASC'
         })
      }
    }

  componentDidMount() {
    axios
      .get("https://guarded-atoll-67449.herokuapp.com/api/presidents/" + this.state.sort)
      .then(response => {
        const newPresidents = response.data.map(p => {
          return {
            key: p.PresidentId,
            name: p.Name,
            birthdate: p.Birthdate,
            birthplace: p.Birthplace,
            deathdate: p.Deathdate,
            deathplace: p.Deathplace
          };
        });

        const newState = Object.assign({}, this.state, {
          presidents: newPresidents
        });

        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  componentDidUpdate() {
    axios
      .get("https://guarded-atoll-67449.herokuapp.com/api/presidents/"+this.state.sort)
      .then(response => {
        const newPresidents = response.data.map(p => {
          return {
            key: p.PresidentId,
            name: p.Name,
            birthdate: p.Birthdate,
            birthplace: p.Birthplace,
            deathdate: p.Deathdate,
            deathplace: p.Deathplace
          };
        });

        const newState = Object.assign({}, this.state, {
          presidents: newPresidents
        });

        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <span className="header"> PresidentWiki </span>
        <div><button onClick={this.handleClick}> Sort by: {this.state.sort} </button></div>
        <PresidentList presidents={this.state.presidents}/>
      </div>
    );
  }
}

export default App;
