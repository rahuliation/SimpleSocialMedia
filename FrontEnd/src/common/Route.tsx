import { Route, Redirect } from 'react-router';
import * as React from 'react';
import { inject, observer } from 'mobx-react';

export const AuthRoute = inject('store')(observer(({
    component: Component,
    store,
    ...rest }) => (
        <Route
            {...rest}
            render={props =>
                store.userStore.currentUser.authenticated === true ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                            }}
                        />
                    )

            }
        />

    )));

    export const GuestRoute = inject('store')(observer(({
        component: Component,
        store,
        ...rest }) => (
            <Route
                {...rest}
                render={props =>
                    store.userStore.currentUser.authenticated === false ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/home',
                                }}
                            />
                        )
    
                }
            />
    
        )));