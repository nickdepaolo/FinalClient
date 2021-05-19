import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Item from './Item/Item'
import Sitebar from './Nav';
import Auth from './Auth/Auth';
import Splash from './Splash/Splash';
import Home from './Home/Home'

type MainProps = {
    
}

type MainState = {
    sessionToken: string | null
}

export default class Main extends React.Component< MainProps, MainState> {
    constructor( props: {} ) {

        super( props )

        this.state = {
            sessionToken: ''
        }
    }
       
    componentDidUpdate() {
        if(localStorage.getItem( 'token' )) {
            this.setState( { sessionToken: localStorage.getItem( 'token' ) } )
        }
    }

    updateToken = ( newToken: string ) => {
        console.log( newToken );
        
        localStorage.setItem( 'token', newToken );
        this.setState( { sessionToken: newToken } )
    }

  
  
    
    protectedViews = () => {
        const token = this.state.sessionToken

        return(
            token === localStorage.getItem( 'token' ) ? <Home sessionToken= {this.state.sessionToken}/>
             : <Auth updateToken = { this.updateToken }/>
        )
    }

    render() {
        return(
            <React.Fragment>
                <Router>
                    <Sitebar/>
                        <div>
                            <Switch>
                                <Route exact path='/item' component = { Item } />
                                <Route exact path = '/auth' component = { this.protectedViews } />
                                <Route exact path = '/' component ={ Splash } />
                            </Switch>
                        </div>
                </Router>
            </React.Fragment>
        )
    }
}


