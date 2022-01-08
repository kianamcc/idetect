import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>  
            <div className="center">
                <div className="form center mt3 pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} placeholder='Enter the URL to the image here'/>
                    <button
                        className="w-30 grow f4 link ph3 pv2 dib white bg-blue"
                        onClick={onPictureSubmit}
                        >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;