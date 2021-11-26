import React, { Component } from 'react';
import "./Simplecard.css"

function Simplecard({ image, title, body }) {
    return (
        <div className="homepage-card-container" id="homepage-card-container">
            <div className="homepage-image-container" >
                <img src={image} alt='' />
            </div>
            <div className="homepage-card-content">
                <div className="homepage-card-title">
                    <h3 id="homepage-h">{title}</h3>
                </div>
                <div className="homepage-card-body">
                    <p id="homepage-p">{body}</p>
                </div>
            </div>

            <div className="homepage-btn">
                <button>
                    <a id="view" href='/'>Know More</a>
                </button>
            </div>

        </div>
    )
}

export default Simplecard;

