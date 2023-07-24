import React from 'react';
import styles from './css_modules/edit_form.module.css'


class ProductCreationForm extends React.Component {
    state = {
      name: "",
      price: "",
      type: "",
      errorMessage: null
    };
  
  handleSave = async(event) => {
    event.preventDefault();
    const url = "http://localhost:5000/products/"
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state),
          credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        await this.props.getSessionInfo();
        this.props.toggleShowProductForm();
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }
  };

  render() {
    return (
    <React.Fragment>
    <div className={styles["product-form"]}> 
        {this.state.errorMessage && <div className={styles['error-message']}>
            <p>{this.state.errorMessage}</p>
        </div>}
        <div>
            <label htmlFor='name'>Name</label>
            <input type="text" id="name" value={this.state.name} onChange={(event) => {
                this.setState({name: event.target.value})
            }}/>
        </div>
        <div>
            <label htmlFor="type">Type</label>
            <input type="text" id="type" value={this.state.type} onChange={(event) => {
                this.setState({type: event.target.value});
            }}/>
        </div>
        <div>
            <label htmlFor="type">Price</label>
            <input type="text" id="type" value={this.state.price} onChange={(event) => {
                this.setState({price: event.target.value});
            }}/>
        </div>
        <div className={styles['buttons']}>
              <a className={styles['cancel']} onClick={()=> this.props.toggleShowProductForm()}>cancel</a>
              <a className={styles['save']} onClick={this.handleSave}>save</a>
          </div>
    </div>
    </React.Fragment>
    );
  }
}

export default ProductCreationForm;
