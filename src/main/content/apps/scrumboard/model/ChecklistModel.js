import {FuseUtils} from '@fuse';

class ChecklistModel {
    /**
     * Constructor
     */
    constructor(data)
    {
        const item = data ? data : {};

        this.id = item.id || FuseUtils.generateGUID();
        this.name = item.name || '';
        this.checkItems = item.checkItems || [];
    }
}

export default ChecklistModel;
