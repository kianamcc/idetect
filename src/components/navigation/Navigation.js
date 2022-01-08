import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange("signout")} className='f3 link dim white pa3 pointer'>Sign Out</p>
                </nav>
            )
        }
        else { // not signed in menu screen
            return (
                <div className='f3 white'>
                    <h1 className='mb0'>idetect</h1>
                <nav style={{display: 'flex', justifyContent: 'center'}}>
                    <p onClick={() => onRouteChange("signin")} className='mt0 f3 underline link dim white-60 pa3 pointer'>Sign in</p>
                    <p onClick={() => onRouteChange("register")} className='mt0 f3 underline link dim white-60 pa3 pointer'>Register</p>
                </nav>
                </div>
            )
        }
}

export default Navigation;