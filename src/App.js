import './styles/App.scss';
import firebase from './firebase.js';
import Header from './Header.js';
import Gallery from './Gallery.js'; 
import ShoppingCart from './ShoppingCart.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';


function App() {

  const [ soapProducts, setSoapProducts ] = useState([]);

  const [ displayCart, setDisplayCart ] = useState(false);
  
  useEffect(() => {

    const dbRef = firebase.database().ref()
  
    dbRef.on('value', (data) => {
      const soapData = data.val();
      
      const copySoap = [];

      for (let soapKey in soapData) {

        copySoap.push(soapData[soapKey]);
        
      }

      setSoapProducts(copySoap);
  
    })     
  },[]);

  const handleClick = (event) => {
    const selectedSoap = event.target.id;
    const dbRef = firebase.database().ref(`${selectedSoap}`)

    dbRef.update({
      inCart: firebase.database.ServerValue.increment(1)
    })
  }

  const handleRemove = (event) => {
    const removeSoap = (event.target.id)
    const dbRef = firebase.database().ref(`${removeSoap}`)

    dbRef.update({
      inCart: firebase.database.ServerValue.increment(-1)
    })
  }

  const handleToggle = () => {
    setDisplayCart(!displayCart);
  }

  return (
    <div className='App'>
      <Header />

      <main>
        <div className='wrapper'>
          <h2>Available Soaps:</h2>

          <div className='soap-container'>
            {
              soapProducts.map((item, index) => {
                return (
                  <Gallery 
                    key={`${index}-${item.name}`} 
                    ingredients={item.ingredients}
                    soapName={item.name}
                    soapTitle={item.title}
                    picture={item.image}
                    price={item.price}

                    amountInCart={item.inCart}
                    addToCart={handleClick}
                  />
                )
              })
            }
            <button className='checkout' onClick={handleToggle}>check out</button>
          </div>  
        </div> 


        <div className={displayCart ? 'shopping-cart show-cart' : 'shopping-cart'}>
          <button onClick={handleToggle}className={!displayCart ?'close-cart shopping-cart' : 'close-cart'}>X</button>
          {
            soapProducts.filter(item => item.inCart > 0)
              .map((soapInCart, index) => (
                <ShoppingCart 
                  key={`${index}-${soapInCart.name}`}
                  soapName={soapInCart.name}
                  soapTitle={soapInCart.title}
                  amountInCart={soapInCart.inCart}
                  price={soapInCart.price}
                  removeFromCart={handleRemove}
                />
              ))
          }
        </div>
        
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
