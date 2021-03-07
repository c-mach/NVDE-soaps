import './styles/App.scss';
import firebase from './firebase.js';
import Header from './Header.js';
import Gallery from './Gallery.js'; 
import { useState, useEffect } from 'react';


function App() {

  const [ soapProducts, setSoapProducts ] = useState([]);
  
  useEffect(() => {

    const dbRef = firebase.database().ref()

    // const inventory = {
    //     soap1: {
    //       name: 'soap1',
    //       price: 10,
    //       ingredients: ['a', 'b', 'c'],
    //       image: 'http://placekitten.com/g/200/300',
    //       inCart: 0
    //     },
    //     soap2: {
    //       name: 'soap2',
    //       price: 10,
    //       ingredients: ['a', 'b', 'c'],
    //       image: 'http://placekitten.com/g/200/300',
    //       inCart: 0
    //     },
    //     soap3: {
    //       name: 'soap3',
    //       price: 10,
    //       ingredients: ['a', 'b', 'c'],
    //       image: 'http://placekitten.com/g/200/300',
    //       inCart: 0
    //     },
    //     soap4: {
    //       name: 'soap4',
    //       price: 10,
    //       ingredients: ['a', 'b', 'c'],
    //       image: 'http://placekitten.com/g/200/300',
    //       inCart: 0
    //     }
    // };
    
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
    {
      soapProducts.map((item, index) => {
        return (
          <Gallery 
            key={`${index}-${item.name}`} 
            ingredients={item.ingredients}
            soapName={item.name}
            picture={item.image}
            price={item.soap}

            amountInCart={item.inCart}
            addToCart={handleClick}
          />
        )
      })
    }
    </div>
  );
}

export default App;
