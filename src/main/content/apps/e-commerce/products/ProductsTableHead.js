import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    IconButton,
    Icon,
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';

const rows = [
    {
        id            : 'image',
        numeric       : false,
        disablePadding: true,
        label         : '',
        sort          : false
    },
    {
        id            : 'name',
        numeric       : false,
        disablePadding: false,
        label         : 'Name',
        sort          : true
    },
    {
        id            : 'categories',
        numeric       : false,
        disablePadding: false,
        label         : 'Category',
        sort          : true
    },
    {
        id            : 'priceTaxIncl',
        numeric       : true,
        disablePadding: false,
        label         : 'Price',
        sort          : true
    },
    {
        id            : 'quantity',
        numeric       : true,
        disablePadding: false,
        label         : 'Quantity',
        sort          : true
    },
    {
        id            : 'active',
        numeric       : true,
        disablePadding: false,
        label         : 'Active',
        sort          : true
    }
];

const styles = theme => ({
    root                : {},
    actionsButtonWrapper: {
        position      : 'absolute',
        top           : 0,
        left          : 64,
        width         : 64,
        height        : 63,
        zIndex        : 10,
        background    : theme.palette.background.paper,
        alignItems    : 'center',
        display       : 'flex',
        justifyContent: 'center'
    }
});

class ProductsTableHead extends React.Component {
    state = {
        selectedProductsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedProductsMenu = (event) => {
        this.setState({selectedProductsMenu: event.currentTarget});
    };

    closeSelectedProductsMenu = () => {
        this.setState({selectedProductsMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selectedProductsMenu} = this.state;

        return (
            <TableHead>
                <TableRow className="h-64">
                    <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                        {numSelected > 0 && (
                            <div className={classes.actionsButtonWrapper}>
                                <IconButton
                                    aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedProductsMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedProductsMenu"
                                    anchorEl={selectedProductsMenu}
                                    open={Boolean(selectedProductsMenu)}
                                    onClose={this.closeSelectedProductsMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                this.closeSelectedProductsMenu();
                                            }}
                                        >
                                            <ListItemIcon className={classes.icon}>
                                                <Icon>delete</Icon>
                                            </ListItemIcon>
                                            <ListItemText inset primary="Remove"/>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        )}
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ProductsTableHead);
