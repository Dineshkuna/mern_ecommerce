import React from 'react'
import '../CartStyles/OrderConfirm.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import CheckoutPath from './CheckoutPath'

function OrderConfirm() {
    const {shippingInfo, cartItems} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);
    console.log(shippingInfo,cartItems,user);
  return (
    <>
    <PageTitle title="Confirm Your Order" />
    <Navbar />
    <CheckoutPath activePath={1} />
 <div className="confirm-container">
    <h1 className="confirm-header">Order Confirmation</h1>
    <div className="confirm-table-container">
        <table className="confirm-table">
            <caption>Shipping Details</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{user.name}</td>
                    <td>{shippingInfo.phoneNumber}</td>
                    <td>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pincode}</td>
                </tr>
            </tbody>
        </table>

        <table className="confirm-table cart-table">
            <caption>Cart Items</caption>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>TotalPrice</th>
                </tr>
            </thead>
            <tbody>
                {cartItems && cartItems.map((item) => (
                    <tr key={item.name}>
                        <td><img src={item.image} alt={item.name} className="confirm-product-image" /></td>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>

        </table>
    </div>
 </div>



    <Footer />

    
    
    </>
  )
}

export default OrderConfirm