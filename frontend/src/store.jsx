import { Navigate } from "react-router-dom";
import React, { Component } from 'react';
import StoreHeader from './store_header';
import SiteHeader from './site_header';
import StoreBody from './store_body';
import Footer from './footer';


class Store extends Component {
    state = {
            navigateTo: false,
            resetTotals: false,
        }

    render(){
        if (this.state.navigateTo) {
            return <Navigate to={this.state.navigateTo} replace={true} />;
          }

        if (!this.state.sessionInfo) {
            return null;
          }

        const aggregates = this.state.sessionInfo?.ledger?.aggregates ?? {};
        return (
            <React.Fragment>
                <SiteHeader isLoggedIn={this.state.sessionInfo.isLoggedIn}
                            isOpen={this.state.sessionInfo.ledger.isOpen}
                            openLedger={this.openLedger}
                            closeLedger={this.closeLedger}/>
                <div>
                    {this.state.sessionInfo.ledger.id ? (<StoreHeader 
                    storeName={this.state.sessionInfo.store}
                    ledgerName={this.state.sessionInfo.ledger.name}
                    totalAmount={this.state.sessionInfo.ledger.total}
                    isOpen={this.state.sessionInfo.ledger.isOpen}
                    openLedger={this.openLedger}
                    closeLedger={this.closeLedger}/>) : (
                        <StoreHeader 
                            storeName={this.state.sessionInfo.store}
                            openLedger={this.openLedger}
                            closeLedger={this.closeLedger}/>)}
                    {this.state.sessionInfo.ledger.id ?  
                               (<StoreBody aggregates={aggregates}
                               isOpen={this.state.sessionInfo.ledger.isOpen}
                               ledgerId={this.state.sessionInfo.ledger.id}
                               products={this.state.sessionInfo.products}
                               getSessionInfo={this.getSessionInfo}
                               resetTotals={this.state.resetTotals}/>) :
                                (<StoreBody getSessionInfo={this.getSessionInfo}
                                            products={this.state.sessionInfo.products}/>)
                            }               
                </div>
                <Footer/>
            </React.Fragment>
        );
    }

    
    componentDidMount = async () => {
        this.getSessionInfo()
    }

    componentDidUpdate () {
        if (this.state.resetTotals) {
            this.setState({resetTotals: false});
        }
    }

    triggerReset = () => {
        this.setState({resetTotals: true});
    }
  
    getSessionInfo = async () => {
        try {
            const response = await fetch("https://howmarket-api.onrender.com/users/session", {credentials: "include"});
            const data = await response.json();
            console.log("data: ", data);
 
            if (!data.store){
                this.setState({ navigateTo: "/login" });
            }
            await this.setState({sessionInfo: data});
         } catch (error) {
             console.log(error);
         }
    }


    closeLedger = async() => {
        const url = "https://howmarket-api.onrender.com/ledgers/" + this.state.sessionInfo.ledger.id
        try {
          const response = await fetch(url, {
            method: 'PUT',
            credentials: "include"
          });
          await this.getSessionInfo();
        } catch(error) {
          console.log(error);
        }
    }
    
    openLedger = async () => {
      try {
          const response = await fetch("https://howmarket-api.onrender.com/ledgers", {method: 'POST', credentials: 'include'});
          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message);
          }
          await this.triggerReset();
          await this.getSessionInfo();
      } catch (error) {
          console.log("error: ", error.message);
      }
    }  
}

export default Store;