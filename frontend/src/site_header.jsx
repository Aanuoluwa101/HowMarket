import React, { Component } from "react";
import { Link, Navigate } from 'react-router-dom';
import header_styles from "./css_modules/site_header.module.css";
import logo from './images/modern-minimalist-wave-logo-design-1-86ca297297563bf03f5fdd20aaf60c53c844c766c429b0917c1494c4054d819c.jpg';


class SiteHeader extends Component {
  state = {
    navigateTo: null
  }

  render() {
    const { isLoggedIn, isOpen } = this.props;

    if (this.state.navigateTo){
        return <Navigate to={this.state.navigateTo} replace={true} />;
    }
      return (
        <header>
            <div className={header_styles['logo-container']}>
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/store">Store</Link></li>
                    {isLoggedIn && <li className={header_styles['ledger']}><Link to="/ledgers">Journals</Link></li>}
                    <li className={header_styles['market']}><Link to="/market">Market</Link></li>
                </ul>
            </nav>
            <div className={header_styles['new-logout']}>
              {isLoggedIn && this.props.openLedger && <a className={`${header_styles['button']} ${header_styles['new']}`} onClick={this.handleClick}>{isOpen? "Close Journal" : "New Journal"}</a>}
              {!this.props.isOpen && <div id={header_styles["warning"]}>Please note that opening a new journal when not signed in provides you with a
                        Temporary store, which lasts only till the end of the day and can hold only a single Journal!</div>}
              {!isLoggedIn && <Link className={header_styles['button']} to={"/register"}>Sign up</Link>}
              {!isLoggedIn && <Link className={header_styles['login-logout']} to={"/login"}>Sign in</Link>}
              {isLoggedIn && <a className={header_styles['login-logout']} onClick={this.handleLogout}>Sign out</a>}
            </div>
        </header>
       ); 
   }

   handleClick = () => {
    const { isOpen, closeLedger, openLedger } = this.props;
    if (isOpen) {
      closeLedger();
    } else {
      openLedger();
    }
}


   handleLogout = async () => {
    const requestOptions = {
        method: 'POST',
        credentials: "include"
      };
        try {
            const response = await fetch('https://howmarket-api.onrender.com/users/logout', requestOptions)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
              }
            this.setState({ navigateTo: "/" });
        } catch (error) {
            console.log(error);
        }
   }
}

export default SiteHeader;