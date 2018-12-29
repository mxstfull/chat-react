import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const ScrumboardAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/scrumboard/boards/:boardId/:boardUri?',
            component: FuseLoadable({
                loader: () => import('./board/Board')
            })
        },
        {
            path     : '/apps/scrumboard/boards',
            component: FuseLoadable({
                loader: () => import('./boards/Boards')
            })
        },
        {
            path     : '/apps/scrumboard',
            component: () => <Redirect to="/apps/scrumboard/boards"/>
        }
    ]
};
