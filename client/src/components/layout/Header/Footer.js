import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
    <footer id="footer">
      <div className="leftFooter">
        <h1>SoleKikZ</h1>
        <h4>DOWNLOAD OUR APP</h4>
        <div className="imgs">
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
        </div>
      </div>

      {/* <div className="midFooter">
        
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MeAbhiSingh</p>
      </div> */}

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <div>
            <a href="http://instagram.com/">Instagram</a>
        </div>
        <div>
            <a href="http://youtube.com/">Youtube</a>
        </div>
        <div>
            <a href="http://instagram.com/">Facebook</a>
        </div>
      </div>
    </footer>

    {/* <div className="end">Copyrights @TejasKulkarni2003</div> */}
    </>
  );
};

export default Footer;