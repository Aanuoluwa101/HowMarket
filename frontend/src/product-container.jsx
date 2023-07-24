import React, { Component } from 'react';
import store_product_styles from './css_modules/store_product.module.css';
import ProductEditForm from './edit_form';

class StoreProduct extends Component {
  state = {
        showForm: false,
        selling: false,
        count: 0,
    };


render() {
    const isOpen = this.props.isOpen ? this.props.isOpen : false;
    const { product } = this.props;

    if (this.props.resetTotals){
      this.setState({ total: 0 })
    }
    return (
      <div className={store_product_styles['product']}>
        <div className={store_product_styles['heading']}>
            <h3 className={store_product_styles['name']}>{product.name}</h3>
            <span className={store_product_styles['price']}>#{product.price}</span>
        </div>
        <div className={store_product_styles['mid']}>
            <span className={store_product_styles['sale-total']}>{this.state.total}</span>
        </div>
        <div className={store_product_styles['foot']}>
             <div className={store_product_styles['buttons']}>
                {isOpen && !this.state.selling && !this.state.showForm &&
                          <button className={store_product_styles['sell']} onClick={this.startSale}>Sell</button>}  
                {!this.state.selling && !this.state.showForm &&
                          <button className={store_product_styles['edit']} onClick={this.startEdit}>Edit</button>}

                {this.state.selling && <button className={store_product_styles['minus']} onClick={this.handleCountDecrease}>-</button>}
                {this.state.selling && <span className={store_product_styles['count']}>{this.state.count}</span>}
                {this.state.selling && <button className={store_product_styles['plus']} onClick={this.handleCountIncrease}>+</button>}
                {this.state.selling && <button className={store_product_styles['save']} onClick={this.handleSaleSave}>Save</button>}
                {this.state.selling && <button className={store_product_styles['cancel']} onClick={this.handleSaleCancel}>Cancel</button>}
             </div>
                <span className={store_product_styles['type']}>{product.type}</span>
        </div>
        {this.state.showForm && (
          <div className={store_product_styles['edit-form']}>
            <ProductEditForm closeEdit={this.closeEdit} product={product} getSessionInfo={this.props.getSessionInfo}/> 
          </div>
        )}
      </div>
    );
  }

  componentDidMount = () => {
    this.setState({total: this.props.aggregate});
  }

  closeEdit = () => {
    this.setState(prevState => ({
      showForm: false,
    }))
  }

  startEdit = () => {
      this.setState({ showForm: true });
  }
  

  startSale = () => {
    this.setState({selling: true, count: 0})
  }

  handleSaleSave = async() => {
    this.setState({selling: false, total: this.props.aggregate});

    const url = "http://localhost:5000/ledgers/" + this.props.ledgerId;
    const body = { total: this.state.total - this.props.aggregate,
                   count: this.state.count,
                   productId: this.props.product.id
                  }
    try {
      const response = await fetch(url, {
              method: 'POST', 
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body)
            });

      const data = await response.json();
      console.log("data: ", data);
      await this.setState({total: data.ledger.aggregates[this.props.product.id]});
      await this.props.getSessionInfo();
      
   } catch (error) {
       console.log(error);
   }
  }
    
  handleSaleCancel = () => {
    this.setState({selling: false, total: this.props.aggregate});
  }

  handleCountDecrease = () => {
    this.setState(prevState => ({
      count: Math.max(prevState.count - 1, 0),
    }), () => { 
      this.calculateTotal();
    });
    
  };

  handleCountIncrease = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }), () => {
      this.calculateTotal();
    });
  };

  calculateTotal = () => {
    const count = this.state.count;
    const productPrice = this.props.product.price;

    this.setState({ total: this.props.aggregate + (count * productPrice) });
  };
}

export default StoreProduct;
