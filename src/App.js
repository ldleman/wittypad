import React, { Component } from 'react';
import './App.css';
import SidePanel from './SidePanel';
import LoginBox from './LoginBox';
import Editor from './Editor';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');


class App extends Component {

  state = {
    user: {}
  };


  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);


    socket.on('authentified', user => {
      this.setState({user});
      this.loginbox.setState({user:user});
    });
  }

  authenticate(login,password){
    socket.emit('authenticate', {login:login, password:password});
  }

  logout(){
    this.setState({user:null});
    socket.emit('logout');
  }

  render() {
    if(this.workspace) this.workspace.style.display = this.state.user? 'block':'none';
    if(this.home) this.home.style.display = this.state.user? 'none':'block';
    return (
      <div className="app">
        <div className="header">
            <a href="" className="logo"><i className="fa fa-file-text-o"></i></a>
           <div className="login"><LoginBox authenticate={this.authenticate} logout={this.logout}  ref={(ref) => this.loginbox = ref} /></div>
          <div className="clear"></div>
        </div>
      
        <div className="workspace" ref={(ref) => this.workspace = ref}>
          <div className="sideleft"><SidePanel /></div>
          <div className="editor"><Editor /></div>
        </div>
        <div className="home" ref={(ref) => this.home = ref}>
          <h1>Il faut se connecter avant tout :) !</h1>
        </div>
      </div>
    );





  }
}

export default App;
