import React from 'react';
import "./Footer.css";
import {Button, Link} from "@material-ui/core";

function Footer() {
    return (
        <div className="footer">
            <Button
            onClick={()=>window.scrollTo(0, 0)}
            className="footer__button" variant="outlined">
          Back to top
            
            </Button>
            <div className="footer__info">
            <div className="footer_infobox1">
                   <h4> Get to Know Us</h4>
                    <p>Careers</p>
                    <p>Blog</p>
                    <p>About Amazon</p>
                    <p>Sustainability</p>
                    <p>Investor Relations</p>
                    <p>Amazon Devices</p>
                    <p>Amazon Tours</p>
            </div>
            <div className="footer_infobox1">
                   <h4> Make Money with Us</h4>
                    <p>Sell on Amazon</p>
                    <p>Sell Your Apps on Amazon</p>
                    <p>Self-Publish with Us</p>
                    <p>Advertise Your Products</p>
                    <p>Investor Relations</p>
                    <p>Become an Affiliate</p>
                    <p>Host an Amazon Hub</p>
            </div>
            <div className="footer_infobox1">
                   <h4> Amazon Payment Products</h4>
                    <p>Amazon Business Card</p>
                    <p>Shop with Points</p>
                    <p>Reload Your Balance</p>
                    <p>Amazon Currency Converter</p>
                    <p>Investor Relations</p>
                    <p>Amazon Devices</p>
                    <p>Amazon Tours</p>
            </div>



            </div>
        </div>
    )
}

export default Footer
