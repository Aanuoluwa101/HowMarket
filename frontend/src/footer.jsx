import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/modern-minimalist-wave-logo-design-1-86ca297297563bf03f5fdd20aaf60c53c844c766c429b0917c1494c4054d819c.jpg';
import git from './images/github_logo.png';
import linkedIn from './images/linkedin-logo-linkedin-symbol-linkedin-icon-free-free-vector.jpg';
import styles from './css_modules/footer.module.css';

class Footer extends Component {
    render () {
        return (
            <footer>
                <div className={styles["logo-container"]}>
                    <img src={logo} alt="logo"/>
                    <span>Sales Journal</span>
                </div>
                <div className={styles["others"]}>
                    <div className={styles["my-account"]}>
                        <span className={styles["title"]}>My Account</span>
                        <ul>
                            <li><Link to="/store">Store</Link></li>
                            <li><Link to="/ledgers">Journals</Link></li>
                        </ul>
                    </div>
                    <div className={styles["about-dev"]}>
                        <span className={styles["title"]}>About Dev</span>
                        <div  className={styles["links"]}>
                            <a href="https://github.com/Aanuoluwa101" target="_blank" className={styles["git"]}><img src={git}/></a>
                            <a href="https://www.linkedin.com/in/aanuoluwapo-ayodeji-995904261/" target="_blank" className={styles["linkedIn"]}><img src={linkedIn}/></a>
                        </div>
                    </div>
                </div>
                <p  className={styles["copyright"]}>Copyright Ayodeji Aanu 2023</p>
            </footer>
        );
    }
}

export default Footer;