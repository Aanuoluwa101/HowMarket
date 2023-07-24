import React, { Component } from 'react';
import StoreProduct from './product-container';
import ProductCreationForm from './product_form';
import styles from './css_modules/general.module.css';



class StoreBody extends Component {
    state = {
        showProductForm: false
    }

    render() {
        return (
            <div className={styles['container']}>
                {this.props.products.map((product) => {
                    if (this.props.ledgerId) {
                        const { isOpen, aggregates, ledgerId, resetTotals} = this.props;
                        return (
                            <StoreProduct
                            key={product.id}
                            product={product}
                            aggregate={aggregates[product.id] || 0}
                            isOpen={isOpen}
                            ledgerId={ledgerId}
                            getSessionInfo={this.props.getSessionInfo}
                            resetTotals={resetTotals}
                            />
                        )
                    } else {
                        return (
                            <StoreProduct
                            key={product.id}
                            product={product}
                            getSessionInfo={this.props.getSessionInfo}
                            />
                        )
                    }
                    
                })}
                <div className={styles["empty-box"]}>
                    <span onClick={this.toggleShowProductForm} className={styles["centered-text"]}>Add Product</span>
                {this.state.showProductForm && (
                        <div className={styles['product-form']}>
                            <ProductCreationForm  toggleShowProductForm={this.toggleShowProductForm} getSessionInfo={this.props.getSessionInfo}/> 
                        </div>
                )}
                </div>
            </div>
        )
    }

    toggleShowProductForm = () => {
        this.setState((prevState) => ({
            showProductForm: !prevState.showProductForm
        }))
    }  
}

export default StoreBody;