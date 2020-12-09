import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../../config/config.js';

function PreviewResponse() {
    const [preview, setPreview] = React.useState(false);

    useEffect(() => {
      axios
        .get(config.DOMAIN.name + 'response/tossResponses', {
            withCredentials: true,
            credentials: 'include',
          })
        .then((response) => {
            setPreview(response.data.data.responses);
        })
        .catch((error) => console.error(error));
    }, []);

  return (
    <div className="previewResponsePage">
        <div> 
            {Object.keys(preview).map((keyName, i) => {
                return (
                    <p>{preview[keyName].comment}<br></br></p>  
                );
            })}
    
        </div>
    </div>
  );
}

export default PreviewResponse;
