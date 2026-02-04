
import React from 'react'
import '../pageStyles/Home.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ImageSlider from '../components/ImageSlider'
import Product from '../components/Product'
import PageTitle from '../components/PageTitle'

const products = [

  
        {
            "_id": "6979ea2a11bdf70639b2e1c3",
            "name": "Product5",
            "price": 500,
            "ratings": 0,
            "image": [
                {
                    "public_id": "This is test id1",
                    "url": "This is test url1",
                    "_id": "6979ea2a11bdf70639b2e1c4"
                }
            ],
            "category": "shirt",
            "stock": 7,
            "numOfReviews": 0,
            "reviews": [],
            "createdAt": "2026-01-28T10:51:22.703Z",
            "__v": 0
        },
        {
            "_id": "6979ef6727ed87ddbba8fc84",
            "name": "Product1",
            "price": 100,
            "ratings": 2.6666666666666665,
            "image": [
                {
                    "public_id": "This is test id2",
                    "url": "This is test url2",
                    "_id": "6979ef6727ed87ddbba8fc85"
                }
            ],
            "category": "phone",
            "stock": 1,
            "numOfReviews": 3,
            "reviews": [
                {
                    "user": "6981a2daefd21c216f107b3e",
                    "name": "subbu2",
                    "rating": 3,
                    "comment": "Good",
                    "_id": "6981a85b2860d697d789f9a8"
                },
                {
                    "user": "6981a2c7efd21c216f107b3c",
                    "name": "subbu1",
                    "rating": 4,
                    "comment": "Good, Excellent  ",
                    "_id": "6981a90a39d6710095ce07c6"
                },
                {
                    "user": "698070da151496867f919835",
                    "name": "dinesh123",
                    "rating": 1,
                    "comment": "very bad",
                    "_id": "6981abf8de4e27b621e4d9fc"
                }
            ],
            "createdAt": "2026-01-28T11:13:43.223Z",
            "__v": 4
        },
  
]

function Home() {
  return (
    <>
    <PageTitle title="Home - MyWebsite"/>
    <Navbar />
    <ImageSlider />
    <div className="home-container">
      <h2 className="home-heading">Trending Now</h2>
      <div className="home-product-container">
        {products.map(( product,index) => (<Product  product={ product} key={index}/>))}

      </div>
      </div>

      <Footer />

    
    </>
    
  )
}

export default Home