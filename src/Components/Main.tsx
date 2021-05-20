import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Item from './Item/Item'
import Sitebar from './Nav';
import Auth from './Auth/Auth';
import Splash from './Splash/Splash';
import Home from './Home/Home'
import Logout from './Auth/Logout'


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

    

    getToken = () => {

        if(localStorage.getItem( 'token' ) ) {
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
            token === localStorage.getItem( 'token' ) ? <Home/>
             : <Auth updateToken = { this.updateToken }/>
        )
    }

    logoutView = () => {
        const token = this.state.sessionToken

        return(
            token === localStorage.getItem( 'token' ) ? <Logout/>
             : <Splash/>
            
        ) 
    }

    makeUpdate = ()=> {

        this.forceUpdate()

    }

    swapPath = () => {
        const token = this.state.sessionToken

        return(
            token === localStorage.getItem( 'token' ) ? '/logout'
             : '/splash'
            
        ) 
    }

    render() {
        return(
            <React.Fragment>
                <Router>
                    <Sitebar/>
                        <div onChange={this.getToken} >
                            <div onChange={this.makeUpdate}>
                            <Switch>
                                <Route exact path = '/' component = { Splash } />
                                <Route exact path = '/logout' component = { this.logoutView } />
                                <Route exact path = '/auth' component = { this.protectedViews } />
                                <Route exact path='/item' component = { Item } />
                                <Route exact path = '/home' component = { Home } />
                            </Switch>
                            </div>
                        </div>
                </Router>
            </React.Fragment>
        )
    }
}


