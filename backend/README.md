# howmarket API Documentation

Welcome to the API documentation for howmarket. This guide will help you understand the available API routes and their functionalities.

## Base URL

The base URL for all API routes is `https://howmarket-api.onrender.com`.

## Routes

### 1. Register User

- **Route:** `/register`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:**
  - `username` (string): The username of the user.
  - `password` (string): The password for the user's account.
  - `email` (string): user's email. Emails must be unique
- **Response:**
  - `_id` (string)
  - `storeId` (string)
  - `email` (string)

### 2. Login User

- **Route:** `/login`
- **Method:** POST
- **Description:** Authenticate and log in a user.
- **Request Body:**
  - `email` (string): The email of the user.
  - `password` (string): The password for the user's account.
- **Response:**
  - `message` (string): A message indicating the result of the login process.

### 3. Logout User

- **Route:** `/logout`
- **Method:** POST
- **Description:** Log out the currently authenticated user.
- **Response:**
  - `message` (string): A message indicating the result of the logout process.

### 4. Login Status

- **Route:** `/login_status`
- **Method:** GET
- **Description:** Check the current login status of the user.
- **Response:**
  - `isLoggedIn` (boolean): Indicates whether a user is currently logged in.
 
### 5. Session Information

- **Route:** `/session`
- **Method:** GET
- **Description:** Get information about the current user's session.
- **Response:**
  - `store` (string): store's name which is also the username
  - `ledger` (object): currently open ledger's information. Includes ledger's name, id, sales aggregate, total and open status
  - `products` (list): list of store's products. Each includes product's id, name, type and price
  - `isLoggedIn` (boolean): user's login status
 
### 6. Get Store's Inventory

- **Route:** `/store/inventory`
- **Method:** GET
- **Description:** Get a store's inventory based on the session id
- **Response:**
  - a list of the names of the current store's products

### 7. Get All Products of a Store

- **Route:** `/products`
- **Method:** GET
- **Description:** Get all products of a store based on the session id
- **Response:**
  - a list of the store's products each including product id, name, type and price
 
### 8. Add Products to a Store

- **Route:** `/products`
- **Method:** POST
- **Description:** Add products to a store based on the session id
- **Request Body:**
  - `name` (string)
  - `type` (type)
  - `price` (number)
  - **Response:**
    - object representing product. Includes storeId, productId, name, type, price
 

### 9. Edit a Product

- **Route:** `/products/:id`
- **Method:** PUT
- **Description:** Edit a product.
- **Request Body:**
  - `name` (string)
  - `type` (type)
  - `price` (number)
  - **Response:**
    - object representing product. Includes storeId, productId, name, type, price
   
### 10. Create a New Ledger

- **Route:** `/ledgers`
- **Method:** POST
- **Description:** Create a new ledger for a store based on the session id
 - **Response:**
    - object representing store. Includes store id, products, store name and ledgers

### 11. Add a Sale to a Ledger

- **Route:** `/ledgers/:id`
- **Method:** POST
- **Description:** Add a sale to a ledger of a store based on session id
- **Request Body:**
  - `productId` (string)
  - `count` (number)
  - `total` (number)
  - **Response:**
    - object representing sale

### 12. Close a Ledger

- **Route:** `/ledgers/:id`
- **Method:** PUT
- **Description:** Close a ledger.

### 13. Get Ledger Sales

- **Route:** `/ledgers/:id`
- **Method:** GET
- **Description:** Get the sales of a ledger.

### 14. Get All Closed Ledgers of a Store

- **Route:** `/ledgers`
- **Method:** GET
- **Description:** Get all closed ledgers of a store.



## Status Codes

- `200 OK`: The request was successful.
- `400 Bad Request`: The request was invalid or missing required data.
- `401 Unauthorized`: The user is not authenticated to access the requested resource.


