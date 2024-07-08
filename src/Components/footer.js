import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faXTwitter ,faFacebook} from '@fortawesome/free-brands-svg-icons';
import "../Style/footer.css";

function Footer(){
    return(
        <footer>
          <div className="footer-content">
            <h3>TestHive</h3>
            <p>&copy; Copyright TestHive</p>
            <p>Powered by Quinoid Business Solutions</p>
          </div>
          <div className="social-media">
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="#" >
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="#" >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="#" >
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </a>
          </div>
        </footer>
    );
};

export default Footer;