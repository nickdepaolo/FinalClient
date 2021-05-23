import React from 'react';
import { Link } from "react-router-dom";

const Footer: React.FunctionComponent = () => {
    return (
        <div className='footer'>
        <h6>Nick De Paolo 2021</h6>
        <Link to='https://github.com/nickdepaolo/FinalClient' >Github</Link>
        </div>
    )
}

export default Footer