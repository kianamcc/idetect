import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>  
            <div className="white f3 ma3">
                {`Welcome ${name}, you have made ${entries} submissions so far...`}
            </div>
        </div>
    )
}

export default Rank;