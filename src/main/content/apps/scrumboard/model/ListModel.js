import {FuseUtils} from '@fuse/index';

class ListModel {
    /**
     * Constructor
     */
    constructor(data)
    {
        const list = data ? data : {};

        this.id = list.id || FuseUtils.generateGUID();
        this.name = list.name || '';
        this.idCards = [];
    }
}

export default ListModel;
