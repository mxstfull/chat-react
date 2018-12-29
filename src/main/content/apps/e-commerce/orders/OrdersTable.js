import React, {Component} from 'react';
import {withStyles, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {FuseScrollbars, FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'main/content/apps/e-commerce/store/actions';
import OrdersTableHead from './OrdersTableHead';
import OrdersStatus from '../order/OrdersStatus';
import _ from '@lodash';

const styles = theme => ({
    root: {}
});

class OrdersTable extends Component {
    state = {
        order      : 'asc',
        orderBy    : 'id',
        selected   : [],
        data       : this.props.orders,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
        this.props.getOrders();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.orders, prevProps.orders) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.orders, this.props.searchText);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, searchText);
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if ( event.target.checked )
        {
            this.setState(state => ({selected: this.state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        this.props.history.push('/apps/e-commerce/orders/' + item.id);
    };

    handleCheck = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <OrdersTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />

                        <TableBody>
                            {
                                _.orderBy(data, [
                                    (o) => {
                                        switch ( orderBy )
                                        {
                                            case 'id':
                                            {
                                                return parseInt(o.id, 10);
                                            }
                                            case 'customer':
                                            {
                                                return o.customer.firstName;
                                            }
                                            case 'payment':
                                            {
                                                return o.payment.method;
                                            }
                                            case 'status':
                                            {
                                                return o.status[0].name;
                                            }
                                            default:
                                            {
                                                return o[orderBy];
                                            }
                                        }
                                    }
                                ], [order])
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                className="h-64 cursor-pointer"
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                                onClick={event => this.handleClick(n)}
                                            >
                                                <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={event => event.stopPropagation()}
                                                        onChange={event => this.handleCheck(event, n.id)}
                                                    />
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.id}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.reference}
                                                </TableCell>

                                                <TableCell className="truncate" component="th" scope="row">
                                                    {n.customer.firstName + ' ' + n.customer.lastName}
                                                </TableCell>

                                                <TableCell component="th" scope="row" numeric>
                                                    <span>$</span>
                                                    {n.total}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.payment.method}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    <OrdersStatus name={n.status[0].name}/>
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.date}
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getOrders: Actions.getOrders
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    return {
        orders    : eCommerceApp.orders.data,
        searchText: eCommerceApp.orders.searchText
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(OrdersTable)));
