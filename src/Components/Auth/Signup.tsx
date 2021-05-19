import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

type AuthProps = {

    updateToken: ( newToken: string ) => any

}

type AuthState = {

    email: string,
    password: string,
    userName: string,
    isMaker: boolean,
    storeId: number,
    admin: boolean

}

export default class Signup extends React.Component< AuthProps, AuthState > {
    constructor( props: AuthProps ) {

        super( props )

        this.state = {

            email: '',
            password: '',
            userName: '',
            isMaker: false,
            storeId: 0,
            admin: false

        }
    }
        
    handleSubmit = ( e: { preventDefault: () => void; } ) => {
        e.preventDefault();
    
        if( this.state.password.length < 5 || this.state.password.length >16 ) {
            alert( "Please enter a password between 5 and 16 characters" )

        } else {        
            fetch( `http://localhost:3586/user/register`, {
            method: "POST",
            body: JSON.stringify( { user: { email: this.state.email, password: this.state.password } } ),
            headers: new Headers( {
                'Content-Type': 'application/json'
            } )
            } ).then(
                ( response ) => response.json()
            ).then( ( data ) => {
                this.props.updateToken( data.sessionToken )
                
            } )
        }
    }

    render() {
        return(

            <div>

                <h3>Sign Up</h3>

                <Form onSubmit={ this.handleSubmit }>

                    <FormGroup>
                        <Label htmlFor='email'>E-mail </Label>
                    </FormGroup>

                    <FormGroup>
                        <Input  onChange={ (e) => this.setState( { email: e.target.value } ) } name='email' type='email' />
                    </FormGroup>

                    <br/>

                    <FormGroup>
                        <Label htmlFor='password'>Password </Label>
                    </FormGroup>

                    <FormGroup>
                        <Input onChange={ (e) => this.setState( { password: e.target.value } ) } name='password'  type='password' />
                    </FormGroup>

                    <br/>

                    <FormGroup>
                        <Label htmlFor='userName'>Username </Label>
                    </FormGroup>

                    <FormGroup>
                        <Input onChange={ (e) => this.setState( { userName: e.target.value } ) } name='userName' type='text' />
                    </FormGroup>

                    <br/>

                    <FormGroup>
                        <Label>Are you starting a store? </Label>
                        <Input onChange={ (e) => this.setState( { isMaker: true} ) } type='checkbox' />
                    </FormGroup>

                    <br/>

                    <Button type='submit'>Sign Up</Button>

                </Form>
                
            </div>
        )
    }
}


