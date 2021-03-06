const Gallery = (props) => {
    const { soapName, ingredients, price, picture, amountInCart, addToCart } = props;
    return (
        <ul>
            <li>
                <div className="image-container">
                    <img src={picture} alt="A photo of hand crafted soap."/>
                </div>
                <div className="text-container">
                    <p>{soapName} {price}</p>
                    <p>{ingredients.join(", ")}</p>
                    <button onClick={addToCart({amountInCart})}>Add to Cart!</button>
                </div>
            </li>            
        </ul>
    )
}

export default Gallery;

