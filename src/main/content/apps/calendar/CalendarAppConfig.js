import {FuseLoadable} from '@fuse';

export const CalendarAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/calendar',
            component: FuseLoadable({
                loader: () => import('./CalendarApp')
            })
        }
    ]
};
