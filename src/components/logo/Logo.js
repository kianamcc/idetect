import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
    return (
        <div className="ma4 mt0" style={{display: 'inline-block'}}>  
            <Tilt className="Tilt br2 shadow-2" style={{ height: 150, width: 150}}>
                <div className="Tilt-inner">
                    <img src={logo} alt="logo"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;