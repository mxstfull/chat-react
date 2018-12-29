import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from 'auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import firebaseService from 'firebaseService';
import auth0Service from 'auth0Service';
import jwtService from 'jwtService';

class Auth extends Component {
    /*eslint-disable-next-line no-useless-constructor*/
    constructor(props)
    {
        super(props);

        /**
         * Comment the line if you do not use JWt
         */
        //this.jwtCheck();

        /**
         * Comment the line if you do not use Auth0
         */
        //this.auth0Check();

        /**
         * Comment the line if you do not use Firebase
         */
        //this.firebaseCheck();
    }

    jwtCheck = () => {
        jwtService.on('onAutoLogin', () => {

            this.props.showMessage({message: 'Logging in with JWT'});

            /**
             * Sign in and retrieve user data from Api
             */
            jwtService.signInWithToken()
                .then(user => {
                    this.props.setUserData(user);

                    this.props.showMessage({message: 'Logged in with JWT'});
                })
                .catch(error => {
                    this.props.showMessage({message: error});
                })
        });

        jwtService.on('onAutoLogout', (message) => {
            if ( message )
            {
                this.props.showMessage({message});
            }
            this.props.logout();
        });

        jwtService.init();
    };

    auth0Check = () => {

        auth0Service.init();

        if ( auth0Service.isAuthenticated() )
        {
            this.props.showMessage({message: 'Logging in with Auth0'});

            /**
             * Retrieve user data from Auth0
             */
            auth0Service.getUserData().then(tokenData => {

                this.props.setUserDataAuth0(tokenData);

                this.props.showMessage({message: 'Logged in with Auth0'});
            })
        }
    };

    firebaseCheck = () => {

        firebaseService.init();

        firebaseService.onAuthStateChanged(authUser => {
            if ( authUser )
            {
                this.props.showMessage({message: 'Logging in with Firebase'});

                /**
                 * Retrieve user data from Firebase
                 */
                firebaseService.getUserData(authUser.uid).then(user => {

                    this.props.setUserDataFirebase(user, authUser);

                    this.props.showMessage({message: 'Logged in with Firebase'});
                })
            }
        });
    };

    render()
    {
        const {children} = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
            logout             : userActions.logoutUser,
            setUserData        : userActions.setUserData,
            setUserDataAuth0   : userActions.setUserDataAuth0,
            setUserDataFirebase: userActions.setUserDataFirebase,
            showMessage        : Actions.showMessage,
            hideMessage        : Actions.hideMessage
        },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
