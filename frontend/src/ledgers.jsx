import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import SiteHeader from './site_header';
import Footer from './footer';
import Ledger from './ledger';
import styles from './css_modules/general.module.css';
import ledgers_header_styles from './css_modules/other_headers.module.css';


class Ledgers extends Component {
    state = {
      navigateTo: null
    }

  render() {
    if (this.state.navigateTo) {
      return <Navigate to={this.state.navigateTo} replace={true}/>
    }

    if (this.state.ledgers === undefined) {
      return null;
    }
    return (
      <React.Fragment>
        <SiteHeader isLoggedIn={true}/>
        <div className={ledgers_header_styles["ledgers-header"]}>
            <h1>Journals</h1>
            <h2>View all closed Journals</h2>
            <p>Click show details to see detailed sales of a journal</p>
        </div>
        <div className={styles['container']}>
          {this.state.ledgers.length === 0 ? (<p>No closed Journals here</p>) : (
            this.state.ledgers.map((ledger) => (
                    <Ledger key={ledger.id} ledger={ledger}/>
                )))} 
        </div>
        <Footer/>
      </React.Fragment> 
    );
  }

  
  componentDidMount = async () => {
    try {
    const response = await fetch("https://howmarket-api.onrender.com/ledgers", { credentials: "include" });
    if (response.ok){
      const data = await response.json();
      this.setState({ ledgers: data });
    } else {
      this.setState({ navigateTo: "/login" });
    } 
     
    } catch(error) {
      console.log(error);
    }
  }
}

export default Ledgers;