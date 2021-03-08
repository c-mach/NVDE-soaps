import './styles/App.scss';
import firebase from './firebase.js';
import Header from './Header.js';
import Gallery from './Gallery.js'; 
import Footer from './Footer.js';
import { useState, useEffect } from 'react';


function App() {

  const [ soapProducts, setSoapProducts ] = useState([]);
  
  useEffect(() => {

    const dbRef = firebase.database().ref()

    const inventory = {
        soap1: {
          name: 'soap1',
          title: 'Sage + Olive Oil',
          price: 10,
          ingredients: ['organic olive oil', 'organic coconut oil', 'clary sage essential oil', 'shea butter', 'love'],
          image: 'http://placekitten.com/g/200/250',
          inCart: 0
        },
        soap2: {
          name: 'soap2',
          title: 'Rose Petal + Hibiscus Tea',
          price: 10,
          ingredients: ['organic olive oil', 'organic coconut oil', 'rose petals', 'lemon zest', 'hibiscus tea', 'love'],
          image: 'http://placekitten.com/g/200/250',
          inCart: 0
        },
        soap3: {
          name: 'soap3',
          title: 'Earl Grey Tea + Shea Butter',
          price: 10,
          ingredients: ['organic olive oil', 'organic coconut oil', 'earl grey tea', 'castor oil', 'palm oil', 'shea butter', 'love'],
          image: 'http://placekitten.com/g/200/250',
          inCart: 0
        },
        soap4: {
          name: 'soap4',
          title: 'Charcoal + Honey + Milk',
          price: 10,
          ingredients: ['organic olive oil', 'organic coconut oil', 'honey & milk fragrance', 'charcoal', 'love'],
          image: 'http://placekitten.com/g/200/250',
          inCart: 0
        }
    };
    
    // dbRef.set(inventory);
  
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

  return (
    <div className="App">
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
        </div>  
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
