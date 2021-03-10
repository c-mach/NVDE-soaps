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
        <section className="about">
          <div className='about-container wrapper'>
            <h2>about</h2>
            <p>nvde (pronounced “nude”) soaps are small batch soaps with the most organic ingredients used possible for the most natural product. no nasty harmful chemicals that take away from your skins natural health. a product that is completely nude of all chemicals and harmful products. </p>

            <p>we care about what goes into our everyday cleansing routines and make an effort towards sustainable living, natural soap is an easy switch for your body cleansing products. </p>
          </div>
        </section>
        <div className='wrapper'>
          <section className='soap-container'>
            <h2>available soaps</h2>
            {
              (soapProducts.length === 0) 
                ? <p>sorry, we are restocking right now! check back later or visit us on <a href="https://www.instagram.com/nvde.soap/">Instagram</a>.</p>
              :
              soapProducts.map((item, index) => {
                return (
                  <Gallery 
                    key={`${index}-${item.name}`} 
                    ingredients={item.ingredients}
                    soapName={item.name}
                    soapTitle={item.title}
                    picture={item.image}
                    price={item.price}
                    addToCart={handleClick}
                  />
                )
              })
            }
            <button className='checkout' onClick={handleToggle}>checkout</button>
          </section>  
        </div> 

        <div className={displayCart ? 'cart-container' : ''}>
          <aside className={displayCart ? 'shopping-cart show-cart' : 'shopping-cart'}>
            <button onClick={handleToggle}className={!displayCart ?'close-cart shopping-cart' : 'close-cart'}>X</button>
            <div className="cart-logo">
              <h3>nvde</h3>
              <p>shopping cart</p>
            </div>
            <div className="soap-in-cart">
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
              <p className='total'>total: </p>

              <a href="https://www.instagram.com/nvde.soap/"><button className='order'>order</button></a>
            </div>
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
