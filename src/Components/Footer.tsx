import React from 'react';
import { Link } from "react-router-dom";

const Footer: React.FunctionComponent = () => {
    return (
        <div className='footer'>
        <p id='name' >Nick De Paolo 2021</p>
        <Link className='link2' to='https://github.com/nickdepaolo/FinalClient' >Github</Link>
        </div>
    )
}

export default Footer