import React, { Component } from 'react';
import ledger_styles from './css_modules/ledger.module.css';

class Ledger extends Component {
    state = {
      showDetails: false
    }

  render() {
    if (this.state.sales === undefined){
      return null;
    }

    const { ledger } = this.props;
    return (
      <React.Fragment>
        <div className={ledger_styles['ledger']}>
          <h3 className={ledger_styles['name']}>{ledger.name}</h3>
          <div className={ledger_styles['details']}>
              <div className={ledger_styles['time']}>
                <span className={`${ledger_styles.label} ${ledger_styles.open}`}>Opened </span><span className={ledger_styles['value']}>{ledger.timeCreated}</span>
                <span className={`${ledger_styles.label} ${ledger_styles.close}`}>Closed </span><span className={ledger_styles['value']}>{ledger.timeClosed}</span>
              </div>
              <span className={ledger_styles['total']}>#{ledger.totalAmount}</span>
          </div>
          <button onClick={this.toggleShowDetails}>Show Details</button>
        </div>
        {this.state.showDetails &&
          <div className={ledger_styles["ledger-details"]}> 
            <h3 className={ledger_styles['heading']}>Sales</h3>
            <div className={ledger_styles['table']}>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.sales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.createdAt}</td>
                      <td>{sale.productName}</td>
                      <td>{sale.productPrice}</td>
                      <td>{sale.count}</td>
                      <td>{sale.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={ledger_styles['sales-details-total']}>
              <span className={ledger_styles['sales-details-total-label']}>Grand Total:  </span>
              <span className={ledger_styles['sales-details-total-value']}>#{ledger.totalAmount}</span>
            </div>
            <div className={ledger_styles['hide-button']}>
                <button onClick={this.toggleShowDetails}>Hide Details</button>
            </div>
        </div> 
      }
      </React.Fragment>  
    );
  }

  componentDidMount = async () => {
    const url = "https://howmarket-api.onrender.com/ledgers/" + this.props.ledger.id
    try {
      const response = await fetch(url, { credentials: "include" });
      const sales = await response.json();
      this.setState({ sales: sales });
    } catch (error) {
      console.log(error);
    }
  }

  toggleShowDetails = async () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails
    }))
  }  
}

export default Ledger;