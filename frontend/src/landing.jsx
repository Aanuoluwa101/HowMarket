import { Navigate, Link } from "react-router-dom";
import React, { Component } from 'react';
import Footer from './footer'
import header_styles from './css_modules/site_header.module.css';
import styles from './css_modules/landing.module.css';
import logo from './images/modern-minimalist-wave-logo-design-1-86ca297297563bf03f5fdd20aaf60c53c844c766c429b0917c1494c4054d819c.jpg';
import heroImage from "./images/market-woman-nigeria-edited.jpg";
import ledgers from "./images/ledgers_colored.jpg";
import store from "./images/store_coloured.jpg";
import createAndEdit from "./images/create_and_edit_colored.png";
import market from "./images/market_coloured.png";
import openAndClose from "./images/open_and_close_colored.png";
import record from "./images/record_sales_colored.png";
import aboutImage from "./images/code.png";
import git from './images/github_logo.png';
import linkedIn from './images/linkedin-logo-linkedin-symbol-linkedin-icon-free-free-vector.jpg';

class LandingPage extends Component {
    state = {
        navigateTo: null,
        isLoggedIn: false
    }

    render () {
        if (this.state.navigateTo) {
            return <Navigate to={this.state.navigateTo} replace={true}/>
        }

        return (
            <React.Fragment>
                <header>
                    <div className={header_styles['logo-container']}>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className={header_styles['new-logout']}>
                        {!this.state.isLoggedIn && <a className={`${header_styles['button']} ${header_styles['new']}`} onClick={this.openLedger}>New Journal</a>}
                        <div id={header_styles["warning"]}>Please note that opening a new journal when not signed in provides you with a
                        Temporary store, which lasts only till the end of the day and can hold only a single Journal!</div>
                        <Link className={header_styles['button']} to={"/register"}>Sign up</Link>
                        {!this.state.isLoggedIn && <Link className={header_styles['login-logout']} to={"/login"}>Sign in</Link>}
                        {this.state.isLoggedIn && <Link className={header_styles['login-logout']} to={"/store"}>Store</Link>}
                    </div>
                </header> 
                <section className={styles["hero"]}>
                    <img src={heroImage} alt="A market woman selling"/>
                    <div className={styles["text"]}>
                        <h1>How market today?</h1>
                        <h2>With howmarket you can keep better records of your sales!</h2>
                        <div className={styles["buttons"]}>
                            <Link className={styles['sign-up']} to={"/register"}>Sign up</Link>
                            {!this.state.isLoggedIn && <Link className={styles['sign-in']} to={"/login"}>Sign in</Link>}
                        </div>
                    </div>          
                </section>
                
                <section className={styles["features"]}>
                    <div className={`${styles.feature} ${styles.store}`}>
                        <img src={store} alt="store icon"/>
                        <p className={styles["feature-description"]}>Get a store by Signing up or Opening a Journal</p>
                    </div>
                    <div className={`${styles.feature} ${styles.create}`}>
                        <img src={createAndEdit} alt="drawing pencil icon"/>
                        <p className={styles["feature-description"]}>Create and edit products</p>
                    </div>
                    <div className={`${styles.feature} ${styles.market}`}>
                        <img src={market} alt="market icon"/>
                        <p className={styles["feature-description"]}>Add products from the market</p>
                    </div>
                    <div className={`${styles.feature} ${styles.openClose}`}>
                        <img src={openAndClose} alt="open and close icon"/>
                        <p className={styles["feature-description"]}>Open and close Journals</p>
                    </div>
                    <div className={`${styles.feature} ${styles.record}`}>
                        <img src={record} alt="record icon"/>
                        <p className={styles["feature-description"]}>Record sales in Journals</p>
                    </div>
                    <div className={`${styles.feature} ${styles.view}`}>
                        <img src={ledgers} alt="books icon"/>
                        <p className={styles["feature-description"]}>View past Journals</p>
                    </div>
                </section>
                <section className={styles["about"]}>
                    <div className={styles["image"]}>
                        <img src={aboutImage} alt="store icon"/>
                    </div>
                    <div className={styles["text"]}>
                        <p>
                        The journey of this project was quite fascinating.
                        At first I wanted to build an e-commerce site for local wholesalers and retailers for my alx school
                        porfolio project, but somewhere along the line (or should I say somewhere in the code),
                        the purpose of it became bleak. Then came the idea of howmarket, providing
                        traders a tool for recording their sales with a minimal risk of losing them.  
                        The fruit of this idea is what you are currently viewing and are about
                        to explore.
                    
                        Check out the codes for this work <a href="#">here</a> 
                        </p>
                        <p className={styles["connect-text"]}>Also feel free to connect with me</p>
                        <div className={styles["connect-links"]}>
                            <a href="#" className={styles["git"]} ><img src={git}/></a>
                            <a href="#" className={styles["git"]}><img src={linkedIn}/></a>
                        </div>
                    </div>
                </section>
                <Footer/>
            </React.Fragment>
        );
    }

    componentDidMount = async() => {
        try {
            const response = await fetch('https://howmarket-api.onrender.com/users/login_status', {
                credentials: "include"
            })
            const data = await response.json();
            this.setState({ isLoggedIn: data.isLoggedIn });
        } catch(error) {
            console.log(error);
        }
    }
    openLedger = async () => {
    try {
        const response = await fetch("http://localhost:5000/ledgers", {method: 'POST', credentials: 'include'})
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        this.setState({ navigateTo: "/store" });
    } catch (error) {
        console.log("error: ", error.message);
    }
    }
}

export default LandingPage;