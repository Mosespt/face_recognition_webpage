import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain-100.png';

const Logo = () => {
    return (
        <div className="ma4 mt4 w-45">
            <Tilt className="Tilt br2 shadow-2" perspective={800} glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffffff" glarePosition="all" scale={1.2} style={{ height:150, width:150 }} >
                <div className="Tilt-inner pa3">
                    <img alt='logo' src={brain} style={{ paddingTop: '10px' }} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;