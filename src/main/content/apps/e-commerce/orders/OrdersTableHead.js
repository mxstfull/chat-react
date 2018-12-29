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
        id            : 'id',
        numeric       : false,
        disablePadding: false,
        label         : 'ID',
        sort          : true
    },
    {
        id            : 'reference',
        numeric       : false,
        disablePadding: false,
        label         : 'Reference',
        sort          : true
    },
    {
        id            : 'customer',
        numeric       : false,
        disablePadding: false,
        label         : 'Customer',
        sort          : true
    },
    {
        id            : 'total',
        numeric       : true,
        disablePadding: false,
        label         : 'Total',
        sort          : true
    },
    {
        id            : 'payment',
        numeric       : false,
        disablePadding: false,
        label         : 'Payment',
        sort          : true
    },
    {
        id            : 'status',
        numeric       : false,
        disablePadding: false,
        label         : 'Status',
        sort          : true
    },
    {
        id            : 'date',
        numeric       : false,
        disablePadding: false,
        label         : 'Date',
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

class OrdersTableHead extends React.Component {
    state = {
        selectedOrdersMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedOrdersMenu = (event) => {
        this.setState({selectedOrdersMenu: event.currentTarget});
    };

    closeSelectedOrdersMenu = () => {
        this.setState({selectedOrdersMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selectedOrdersMenu} = this.state;

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
                                    aria-owns={selectedOrdersMenu ? 'selectedOrdersMenu' : null}
                                    aria-haspopup="true"
                                    onClick={this.openSelectedOrdersMenu}
                                >
                                    <Icon>more_horiz</Icon>
                                </IconButton>
                                <Menu
                                    id="selectedOrdersMenu"
                                    anchorEl={selectedOrdersMenu}
                                    open={Boolean(selectedOrdersMenu)}
                                    onClose={this.closeSelectedOrdersMenu}
                                >
                                    <MenuList>
                                        <MenuItem
                                            onClick={() => {
                                                this.closeSelectedOrdersMenu();
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

export default withStyles(styles, {withTheme: true})(OrdersTableHead);
