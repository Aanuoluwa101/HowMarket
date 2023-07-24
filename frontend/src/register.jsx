import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import styles from './css_modules/register.module.css';

class Register extends Component{
    state = {
            username: "",
            email: "",
            password: "",
            errorMessage: "",
            navigateTo: null
        }
 
    render() {
      if (this.state.navigateTo) {
        return <Navigate to={this.state.navigateTo} replace={true} />;
      }

        return (
          <div className={styles['container']}>
            <form className={styles['form']}>
                <h1>Sales Journal</h1>
                {this.state.errorMessage && <p className={styles["error-message"]}>{this.state.errorMessage}</p>}
                <div className={styles["form-group"]}>
                    <label htmlFor="username">Username/store name</label>
                    <input type="text" 
                           id="username" 
                           value={this.state.username}
                           onChange={(event) => {
                            this.setState({username: event.target.value});
                            }}/>
                </div> 
                <div className={styles["form-group"]}>
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                           id="email" 
                           value={this.state.email}
                           onChange={(event) => {
                            this.setState({email: event.target.value});
                            }}/> 
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="password">Password</label>
                    <input type="text" 
                           id="password" 
                           value={this.state.password}
                           onChange={(event) => {
                            this.setState({password: event.target.value});
                            }}/> 
                </div>
                <button className={styles['register-button']} type="button" onClick={this.handleRegister}>sign up</button>
                <p className={styles['login-prompt']}>Have an account? <a className={styles["login"]} onClick={this.goToLogin}>Sign in</a></p>
            </form>
          </div>
        );
    }

    handleRegister = async(event)=> {
        event.preventDefault();

        const { username, email, password } = this.state;
        const data = { username, email, password };
    
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          };

          try {
            const response = await fetch('http://localhost:5000/users/register', requestOptions);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
              }
            this.setState({ navigateTo: "/login" });
          } catch (error) {
            this.setState( {errorMessage: error.message});
          }
    }

    goToLogin = async(event)=> {
        event.preventDefault();
        this.setState({ navigateTo: "/login" });
        return;
    }
}

export default Register;

    