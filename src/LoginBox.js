import React from 'react';
import './App.css';

class LoginBox extends React.Component{
       constructor(props) {
          super(props);
          this.state = { content:'No content' };
          this.authenticate = this.authenticate.bind(this);
          this.logout = this.logout.bind(this);
          this.toggleForm = this.toggleForm.bind(this);
          this.formState = false;
        }

      toggleForm(){
        this.formState = !this.formState;
        this.form.style.transform = this.formState ? "scaleX(1)" :  "scaleX(0)";
        this.txtLogin.focus();
      }

      logout(){
        this.setState({user : null});
        this.props.logout();
      }
      authenticate(){
        this.props.authenticate(this.txtLogin.value,this.txtPassword.value);
      } 

      render() {
         if(!this.state.user){
          return (
            <div>
              <div className="btnLoginForm" onClick={this.toggleForm}><i className="fa fa-lock" ></i> Non connecté</div>
              <div className="loginForm" ref={(ref) => this.form = ref}>
                <label htmlFor="login">Login</label>
                <input className="login" type="text" ref={(ref) => this.txtLogin = ref}/> 
                <label htmlFor="login">Mot de passe</label>
                <input className="password" type="password" ref={(ref) => this.txtPassword = ref}/> 
                <div className="btn" onClick={this.authenticate} ><i className="fa fa-check"></i> Connexion</div>
              </div>
            </div>
              );
        }else{
          return (<div className="loginCard">
            <img src={this.state.user.avatar} alt="avatar" className="avatar"/> {this.state.user.firstname} {this.state.user.name}
             <span className="btnLeave" onClick={this.logout} >Déconnexion</span>
            </div>);
        }
     }
}

export default LoginBox;