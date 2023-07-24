import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import styles from './css_modules/register.module.css';

class Login extends Component {
    state = {
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
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                           id="email" 
                           value={this.state.email}
                           onChange={(event) => {
                            this.setState({email: event.target.value});
                            //console.log(this.state.email);
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
                <button className={styles['login-button']} type="button" onClick={this.handleLogin}>sign in</button>
                <p className={styles['register-prompt']}>Don't have an account? <a className={styles["register"]} onClick={this.goToRegister}>Sign up</a></p>
            </form>
          </div>
        );
    }

    goToRegister = async(event)=> {
        event.preventDefault();
        this.setState({ navigateTo: "/register" });
        return;
    }

    handleLogin = async(event)=> {
        event.preventDefault();
        
        const { email, password } = this.state;
        const data = { email, password }
    
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(data),
          };

          try {
            const response = await fetch('http://localhost:5000/users/login', requestOptions);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
              }
            this.setState({ navigateTo: "/store" });
          } catch (error) {
            this.setState( {errorMessage: error.message});
          }
    }
}

export default Login;

    