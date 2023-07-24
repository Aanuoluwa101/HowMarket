import React, { Component } from 'react';
import styles from './css_modules/market_product.module.css';

class MarketProduct extends Component {
    state = {
            added: this.props.added
        }

    render () {
        const { name, type, price } = this.props.product;
        return (
            <div className={styles['product']}>
                <h3 className={styles['name']}>{name}</h3>
                <span className={`${styles.label} ${styles.type}`}>Type </span><span className={styles['value']}>{type}</span>
                <span className={`${styles.label} ${styles.price}`}>Price </span><span className={styles['value']}>#{price}</span>
                <button onClick={this.handleAdd}>{this.state.added? "Added" : "Add product"}</button>
            </div>
        )
    }

    handleAdd = async() => {
        const { name, type, price } = this.props.product;

        if (!this.state.added) {
             const body = { name, type, price }
             try {
                const response = await fetch("http://localhost:5000/products", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body),
                    credentials: "include"
                });
                this.setState({ added: true });
             } catch (error) {
                console.log(error);
             }
             this.setState({ added: true });
        } else {
            console.log("already added");
        }
    }
}

export default MarketProduct;