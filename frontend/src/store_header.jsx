import React, { Component } from 'react';
import store_header_styles from './css_modules/store_header.module.css';

class StoreHeader extends Component {
  render() {
    const { storeName, ledgerName, totalAmount, isOpen } = this.props;
    return (
      <div className={store_header_styles['store-header']}>
        <div className={store_header_styles['text']}>
        <h1>{storeName}</h1>
        {this.props.ledgerName ?  
        (<div>
            <h2>{ledgerName}</h2>
            <div className={store_header_styles['total-status']}>
              <span className={store_header_styles['label']}>Total: </span>
              <span className={store_header_styles['total']}>#{totalAmount}</span>
              <span className={store_header_styles['label']}>Status: </span>
              <span className={store_header_styles['status']}>{isOpen ? "Open" : "Closed"}</span>
              <a onClick={this.handleClick} className={store_header_styles["open-close-button"]}>{isOpen? "Close Journal" : "New Journal"}</a>
            </div>
        </div>) : (
          <div>
              <h2>You have no sales Journals yet</h2>
              <div className={store_header_styles['total-status']}>
                  <span className={store_header_styles['label']}>Get started by opening a new journal</span>
                  <a onClick={this.handleClick} className={store_header_styles["open-close-button"]}>New Journal</a>
              </div>
          </div>
        )}
        </div>
      </div>
    );
  }

  handleClick = () => {
    const { isOpen, closeLedger, openLedger } = this.props
    if (isOpen) {
      closeLedger();
    } else {
      openLedger();
    }
}
}

export default StoreHeader;