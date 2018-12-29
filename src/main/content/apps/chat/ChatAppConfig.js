import {FuseLoadable} from '@fuse';

export const ChatAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/chat',
            component: FuseLoadable({
                loader: () => import('./ChatApp')
            })
        }
    ]
};
