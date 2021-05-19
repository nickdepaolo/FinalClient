import React from 'react';

type HomeProps = {
    sessionToken: string | null
}

export default class Home extends React.Component <HomeProps,{}> {


    render() {
        
        return(
            <h1>Home Page</h1>
        )
    }
}