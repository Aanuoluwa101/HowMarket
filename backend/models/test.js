/* Test User */
// Good data
const users = [
    { username: "Deranti", email: "deranti@gmail.com", password: "GodIsGood" }, 
    { username: "Mallam Tanko", email: "tanko@gmail.com", password: "4321" },
    { username: "Iya Rashida", email: "Iyarashida@gmail.com", password: "1234" }
  ];
  
  //BAD DATA
  
  //no username
  const noUsername = { email: "deranti@gmail.com", password: "GodIsGood"}
  const noUsername1 = { username: null, email: "deranti@gmail.com", password: "GodIsGood" }
  const noUsername2 = { username: undefined, email: "deranti@gmail.com", password: "GodIsGood" }
  
  //no password
  const noPassword = { username: "Deranti", email: "deranti@gmail.com" }
  const noPassword1 = { username: "Deranti", email: "deranti@gmail.com", password: null }
  const noPassword2 = { username: "Deranti", email: "deranti@gmail.com", password: undefined }
  
  //no email
  const noEmail = { username: "Deranti", password: "1234"}
  const noEmail1 = { username: "Deranti", password: "1234", email: null}
  const noEmail2 = { username: "Deranti", password: "1234", email: undefined}
  
  //only username
  const onlyUsername = { username: "Deranti"}
  
  //only password
  const onlyPassword = { password: "234"}
  
  //only email
  const onlyEmail = { email: "deranti@gmail.com"}
  
  //uppercase email
  const upperEmail = { username: "Ekeson", password: "1123", email: "EKESON@gmail.com"}
  
  //no data at all
  const noData = { }
  
  async function testUser() {
    try {
      const user = await User.create(users[0]);
      console.log(user)
    } catch (e) {
      console.log(e.message);
    }
  }
  
  //testUser()

  


  //getUsers()
// createStore({})
const productData = {
    name: "coke",
    category: "soft drinks",
    storeId: "6498b2d2802606df54e31ee2", //getStore("6498b2d2802606df54e31ee2"),
    prices: [{count : 1, unit_name: "bottle", price: 150}]
  }
  
  
  
  
  //removeProductFromStore("6498b2d2802606df54e31ee2", "64995609e1feb607e5cea879");
  
  //createProduct(productData);
  //getStore("6498b2d2802606df54e31ee2")
  
  //getProducts()
  
  //getStore("6498b2d2802606df54e31ee2")
  
  //getProduct("6498bca20a66925e72af7c4b")
  
  
  
  
  // TESTING LEDGER
  // create a ledger in Deranti stores
  const ledgerId = "64995edc7b8f9953fa7496cc"
  const productId = "6499545d349c3f3145a9e503"
  //createLedger({ storeId: "6498b2d2802606df54e31ee2" });
  
  
  
  //getLedgers()
  getStore("6498b2d2802606df54e31ee2")
  
  //removeLedgerFromStore("6498b2d2802606df54e31ee2", "64995ea2c65113baf6e79f34")
  
  
  //TEST SALES
  const saleData = {
    ledgerId: ledgerId,
    productId: productId,
    count: 3,
    unit_name: "pieces",
    price: 50
  }
  //createSale(saleData)
  //getProducts()
  //getProduct("6498b2d2802606df54e31ee2")
  