import React from 'react';
import { useLocation } from 'react-router-dom';

function Footer(){
    const location = useLocation();
    const user = localStorage.getItem('user');

    // Hide footer on auth pages or if not logged in to focus on login experience
    if (location.pathname === '/login' || location.pathname === '/signup' || !user) return null;

    return(
        <div className="Footer">
            <footer>
                <div className="footer-inner">
                  <p className="footer-copy">© {new Date().getFullYear()} Irakoze Queen Latifa. All rights reserved.</p>
                  <ul className="footer-links">
                    <li><a href="https://github.com/Queenratipha" aria-label="github"><span className="footer-icon" aria-hidden="true">🐙</span> GitHub</a></li>
                    <li><a href="https://wa.me/250796291905" aria-label="whatsapp"><span className="footer-icon" aria-hidden="true">💬</span> WhatsApp</a></li>
                    <li><a href="https://www.tiktok.com/@queen.latifa144" aria-label="tiktok"><span className="footer-icon" aria-hidden="true">🎵</span> Tiktok</a></li>
                    <li><a href="https://www.instagram.com/tifa.lux?igsh=MTd0azRhYjI0eWlzMA==" aria-label="instagram"><span className="footer-icon" aria-hidden="true">📸</span> Instagram</a></li>
                    <li><a href="https://www.facebook.com/tifa.lux" aria-label="facebook"><span className="footer-icon" aria-hidden="true">📘</span> Facebook</a></li>                    
                  </ul>
                </div>
            </footer>
        </div>
    )
}
export default Footer; 