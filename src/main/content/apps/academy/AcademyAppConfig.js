import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';

export const AcademyAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/academy/courses/:courseId/:courseHandle?',
            component: FuseLoadable({
                loader: () => import('./course/Course')
            })
        },
        {
            path     : '/apps/academy/courses',
            component: FuseLoadable({
                loader: () => import('./courses/Courses')
            })
        },
        {
            path     : '/apps/academy',
            component: () => <Redirect to="/apps/academy/courses"/>
        }
    ]
};
