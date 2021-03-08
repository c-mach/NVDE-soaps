const Gallery = (props) => {
    const { soapName, ingredients, price, picture, addToCart, soapTitle } = props;
    return (
        <ul>
            <li>
                <div className="image-container">
                    <img src={picture} alt="Hand crafed soap"/>
                </div>
                <div className="text-container">
                    <h3>{soapTitle}</h3>
                    <p className='ingredient-list'>{ingredients.join(', ')}</p>
                    <p className='cost'>$ {price} / 100g</p>
                    <button onClick={addToCart} id={soapName}>Add to Cart!</button>
                </div>
            </li>            
        </ul>
    )
}

export default Gallery;

