import React from 'react'
import '../componentStyles/Footer.css'
import { Phone, Mail } from '@mui/icons-material';

function Footer() {
  return (
    <footer className='footer'>
        <div className='footer-container'>
            <div className="footer-section contact">
                <h3>Contact Us</h3>
                <p><Phone fontSize='small' />Phone : +8688542405</p>
                <p>< Mail fontSize='small' />Email :  dineshkuna134@gmail.com </p>
            </div>

            <div className="footer-section about">
                <h3>Follow me</h3>
                <div className="social-links">
                    <a href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>




        </div>

        </footer>
  )
}

export default Footer