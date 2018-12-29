import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const ContactsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/contacts/:id',
            component: FuseLoadable({
                loader: () => import('./ContactsApp')
            })
        },
        {
            path     : '/apps/contacts',
            component: () => <Redirect to="/apps/contacts/all"/>
        }
    ]
};
