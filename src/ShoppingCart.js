const ShoppingCart = ({ soapName, soapTitle, amountInCart, price, removeFromCart }) => {

    const totalCost = price * amountInCart;

    return (
        <ul>
            <li>
                <p>{soapTitle}</p>
                <p> qty: {amountInCart} / sub-total: $ {totalCost}</p>
                <button onClick={removeFromCart} id={soapName}>x</button>
            </li>

        </ul>
    )
}

export default ShoppingCart;