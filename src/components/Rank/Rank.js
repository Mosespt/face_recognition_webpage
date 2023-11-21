import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="f2 fw6 ph0 mh0">B R A I N Y</div>
            <div className="white f3">
                <p>{`${name}, your current entry count is ...`}</p>
            </div>

            <div className="white f3">{entries}</div>
        </div>
    );
};

export default Rank;
