const dbRef = firebase.database().ref()

const inventory = {
    soap1: {
        name: 'soap1',
        title: 'Sage + Olive Oil',
        price: 10,
        ingredients: ['organic olive oil', 'organic coconut oil', 'clary sage essential oil', 'shea butter', 'love'],
        image: 'https://res.cloudinary.com/dhcw51nyl/image/upload/c_scale,h_250/v1615232522/IMG_8175_feevt4.jpg',
        inCart: 0
    },
    soap2: {
        name: 'soap2',
        title: 'Rose Petal + Hibiscus Tea',
        price: 10,
        ingredients: ['organic olive oil', 'organic coconut oil', 'rose petals', 'lemon zest', 'hibiscus tea', 'love'],
        image: 'https://res.cloudinary.com/dhcw51nyl/image/upload/c_scale,h_250/v1615232522/IMG_8174_fjwh1s.jpg',
        inCart: 0
    },
    soap3: {
        name: 'soap3',
        title: 'Earl Grey Tea + Shea Butter',
        price: 10,
        ingredients: ['organic olive oil', 'organic coconut oil', 'earl grey tea', 'castor oil', 'palm oil', 'shea butter', 'love'],
        image: 'https://res.cloudinary.com/dhcw51nyl/image/upload/c_scale,h_250/v1615232522/IMG_8177_a6ww1w.jpg',
        inCart: 0
    },
    soap4: {
        name: 'soap4',
        title: 'Charcoal + Honey + Milk',
        price: 10,
        ingredients: ['organic olive oil', 'organic coconut oil', 'honey & milk fragrance', 'charcoal', 'love'],
        image: 'https://res.cloudinary.com/dhcw51nyl/image/upload/c_scale,h_250/v1615232522/IMG_8176_fmgmwf.jpg',
        inCart: 0
    }
};

// dbRef.set(inventory);