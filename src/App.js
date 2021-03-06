import './App.scss';
import firebase from './firebase.js';
import Header from './Header.js';
import Gallery from './Gallery.js'; 
import { useState, useEffect } from 'react';


function App() {

  const [ soapProducts, setSoapProducts ] = useState([]);
  
  useEffect(() => {

    const dbRef = firebase.database().ref()

    const inventory = {
        soap1: {
          name: 'soap1',
          price: 10,
          ingredients: ['a', 'b', 'c'],
          image: 'http://placekitten.com/g/200/300',
          inCart: 0
        },
        soap2: {
          name: 'soap1',
          price: 10,
          ingredients: ['a', 'b', 'c'],
          image: 'http://placekitten.com/g/200/300',
          inCart: 0
        },
        soap3: {
          name: 'soap1',
          price: 10,
          ingredients: ['a', 'b', 'c'],
          image: 'http://placekitten.com/g/200/300',
          inCart: 0
        },
        soap4: {
          name: 'soap1',
          price: 10,
          ingredients: ['a', 'b', 'c'],
          image: 'http://placekitten.com/g/200/300',
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

  return (
    <div className="App">
      <Header />
      
    {
      soapProducts.map((item, index) => {
        console.log(item, 'item');
        return (
          <Gallery 
            soapName={item.name}
            ingredients={item.ingredients}
            purchased={item.inCart}
            price={item.soap}
            picture={item.image}
            key={index} />
        )
      })
    }
    </div>
  );
}

export default App;
