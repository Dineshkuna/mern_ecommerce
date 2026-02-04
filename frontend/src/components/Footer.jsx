import React from 'react'
import '../componentStyles/Footer.css'
import { Phone, Mail, GitHub, LinkedIn, Twitter, YouTube } from '@mui/icons-material';

function Footer() {
  return (
    <footer className='footer'>
        <div className='footer-container'>

            {/* section 1 */}
            <div className="footer-section contact">
                <h3>Contact Us</h3>
                <p><Phone fontSize='small' />Phone : +8688542405</p>
                <p>< Mail fontSize='small' />Email :  dineshkuna134@gmail.com </p>
            </div>

            {/* section 2 */}

            <div className="footer-section social">
                <h3>Follow me</h3>
                <div className="social-links">
                    <a href="" target="_blank" > <GitHub className='social-icon' /></a>
                    <a href="" target="_blank" > <LinkedIn className='social-icon' /></a>
                    <a href="" target="_blank" > <YouTube className='social-icon' /></a>
                    <a href="" target="_blank" > <Twitter className='social-icon' /></a>
                </div>
            </div>


            {/* section 3 */}
            <div className="footer-section about">
                <h3>About</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda delectus dolorum ducimus minus </p>
            </div>
        </div>

        <div className="footer-bottom">
            <p>&copy; 2025 DineshCoding. All rights reserved</p>
        </div>
        </footer>
  )
}

export default Footer