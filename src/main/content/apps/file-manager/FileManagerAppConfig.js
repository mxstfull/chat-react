import {FuseLoadable} from '@fuse';

export const FileManagerAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/file-manager',
            component: FuseLoadable({
                loader: () => import('./FileManagerApp')
            })
        }
    ]
};
