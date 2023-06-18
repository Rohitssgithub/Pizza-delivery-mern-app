import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <>
            <section className="footer ">
                <div className="container-fluid footersec mt-5">
                    <h1>Delicious</h1>
                    <p>Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi fuga
                        maxime saepe commodi
                        placeat. </p>
                    <div className="iconssec">
                        <a href="#"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#"> <i className="fa-brands fa-linkedin"></i></a>
                        <a href="#"> <i className="fa-brands fa-instagram"></i></a>
                        <a href="#"> <i className="fa-brands fa-whatsapp"></i></a>
                    </div>
                    <div className="textsec">
                        <p>© Copyright <strong>Delicious.</strong> All Rights Reserved</p>
                        <p>Designed by <span>BootstrapMade</span></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer
