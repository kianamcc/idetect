import React from 'react';
import "./FaceRecognition.css";

// auto - height automatically adjusted based on width
// props are the parameters
const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma">
            <div className='absolute mt3'>
                <img id="inputimage" src={imageUrl} alt="" width='500px' height='auto' />
                <div className="bounding-box" style={{top: box.topRow, right: box.rightColumn, bottom: box.bottomRow, left: box.leftColumn}}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;