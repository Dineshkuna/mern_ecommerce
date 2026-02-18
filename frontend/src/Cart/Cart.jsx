import React from 'react'
import '../CartStyles/Cart.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Cart() {
    const {cartItems} = useSelector((state) => state.cart);
    console.log(cartItems);
  return (
    <>
    <Navbar />

    <PageTitle title="Your Cart" />

   { cartItems.length === 0 ? (

    <div className="empty-cart-container">
        <p className="empty-cart-message">Your cart is empty</p>
        <Link to="/products" className="viewProducts">
            View Products
        </Link>
    </div>

) : (<>
    <div>
        <div className="cart-page">
            <div className="cart-items">
               <div className="cart-items-heading">
                
                Your Cart
                </div> 
                <div className="cart-table">
                    <div className="cart-table-header">
                        <div className="header-product">Product</div>
                        <div className="header-quantity">Quantity</div>
                        <div className="header-total item-total-heading">Item Total</div>
                        <div className="header-action item-total-heading">Actions</div>
                    </div>

                    {/* cart Items */}

                    {cartItems && cartItems.map((item) => (
                        <CartItem key={item.name} item={item} />
                    ))}
                </div>
            </div>


            {/* Price summary */}
            <div className="price-summary">
                <h3 className="price-summary-heading">Price Summary</h3>
                    <div className="summary-item">
                        <p className="summary-label">Subtotal :</p>
                        <p className="summary-value">₹200/-</p>
                    </div>

                    <div className="summary-item">
                        <p className="summary-label">Tax(18%) :</p>
                        <p className="summary-value">₹10/-</p>
                    </div>

                    <div className="summary-item">
                        <p className="summary-label">Shipping :</p>
                        <p className="summary-value">₹50/-</p>
                    </div>

                     <div className="summary-total">
                        <p className="total-label">Total :</p>
                        <p className="total-value">₹260/-</p>
                    </div>
                    <button className="checkout-btn">Proceed to Checkout</button>
                
            </div>
        </div>


        
      
    </div>
    </>)}
    <Footer />
    </>
  )
}

export default Cart
