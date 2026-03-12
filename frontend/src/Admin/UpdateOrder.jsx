import React from 'react'
import '../AdminStyles/UpdateOrder.css'
import Navbar from '../components/Navbar'
import PageTitle from '../components/PageTitle'
import Footer from '../components/Footer'

function UpdateOrder() {
  return (
    <>
    <Navbar/>
    <PageTitle title='Update Order'/>
    <div className="order-container">
        <h1 className="order-title">Update Order</h1>
        <div className="order-details">
            <h2>Order Information</h2>
            <p><strong>Order ID:</strong>1234</p>
            <p><strong>Shipping Address:</strong>Complete Address</p>
            <p><strong>Phone:</strong>12345678</p>
            <p><strong>Order Status:</strong>Processing</p>
            <p><strong>Payment Status:</strong>Paid</p>
            <p><strong>Total Price:</strong>800/-</p>
        </div>


        <div className="order-items">
            <h2>Order Items</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <td>
                            <img src="" alt="Product Image" className="order-item-image" />
                        </td>
                        <td>Mobile</td>
                        <td>4</td>
                        <td>5000/-</td>
                    </tr>
                </thead>
            </table>
        </div>


        <div className="order-status">
            <h2>Update Status</h2>
            <select className="status-select">
                <option value="">Select Status</option>
                <option value="Shipped">Shipped</option>
                <option value="On The Way">On The Way</option>
                <option value="Delivered">Delivered</option>
            </select>

            <button className="update-button">Update Status</button>
        </div>
    </div>





   <Footer/>
    
    
    </>
  )
}

export default UpdateOrder
