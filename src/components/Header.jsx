import React from 'react';
import NetflixLogo from '../assets/netflix-logo.svg';

const Header = () => {
    return (
        <div className='absolute px-8  -top-10 py-2 bg-gradient-to-b from-black w-full z-10'>
            <img className='w-48' src={NetflixLogo} alt="logo" />
        </div>
    );
};

export default Header;
