import React, { Component } from 'react';
import MarketProduct from './market_product_container';
import SiteHeader from './site_header';
import Footer from './footer';
import styles from './css_modules/general.module.css';
import market_header_styles from './css_modules/other_headers.module.css';


class Market extends Component {
    state = {}

    render () {
            if (this.state.isLoggedIn === undefined) {
                return null;
            } else if (!this.state.products || !this.state.currentStoreInventory) {
                return null;
            }
        return (
            <React.Fragment>
                <SiteHeader isLoggedIn={this.state.isLoggedIn}/>
                <div className={market_header_styles['market-header']}>
                    <h1>Market</h1>
                    <h2>Explore various products</h2>
                    <p>Click Add product to add a product to your store</p>
                </div>
                <div className={styles['container']}>
                    {this.state.products.map((product) => {
                        const added = this.state.currentStoreInventory.includes(product.name)
                        return (    
                            <MarketProduct key={product.id} product={product} added={added}/>
                        )
                    })}
                </div>
                <Footer/>
            </React.Fragment>  
        )
    }

    componentDidMount = async() => {
        try {
            var response = await fetch('https://howmarket-api.onrender.com/users/login_status', {
                credentials: "include"
            });
            var data = await response.json();
            this.setState({ isLoggedIn: data.isLoggedIn });
            
            response = await fetch('https://howmarket-api.onrender.com/market', {
                credentials: "include"
            });
            data = await response.json();
            this.setState({ products: data });

            response = await fetch('https://howmarket-api.onrender.com/store/inventory', {
                credentials: "include"
            })
            data = await response.json();
            this.setState({ currentStoreInventory: data });
          } catch (error) {
            console.log(error);
          }
    }
}

export default Market;