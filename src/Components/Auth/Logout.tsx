import React from 'react';
import {Button} from 'reactstrap'



export default class Logout extends React.Component{

    removeToken = () => {
        localStorage.removeItem('token')
    }

    render() {
        return(
        
            <div>
    
            <h4>Are you sure you want to logout?</h4>
    
            <div>
            {localStorage.getItem( 'token' ) ? <Button onClick={this.removeToken}  > Logout </Button> : <h4>You are logged out</h4>}
            </div>
            
            </div>

        )
    }
}

