import React from 'react';
import { Link } from 'react-router-dom';
import Order from 'service/order-service.jsx'
import MUtil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';
const _mm = new MUtil();
const _order = new Order();

class OrderList extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            data : [],
            pageNum : 1,
            listType : 'list',
            orderNo : ''
        };
    }
    componentDidMount(){
        this.loadOrderList();
    }
    loadOrderList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 如果是搜索的话。需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.orderNo = this.state.orderNo;
        }
        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        },errMsg => {
            this.setState({
                data : []
            });
            _mm.errorTips(errMsg);
        });
    }
    // 搜索
    onSearch(orderNumber){
        let listType = orderNumber === '' ? 'list' : 'search';
        this.setState({
            listType : listType,
            pageNum : 1,
            orderNo : orderNumber
        },() => {
            this.loadOrderList();
        });
        
    }
    // 当页数变化时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadOrderList();
        });
    }
    getOrderStatus(status){
        let arr=[];
        if(status==1){
            arr={
                    cName:'unpay',
                    txt:'未付款'
                };//
            return <span className="order-status-unpay">{arr.txt}</span>;
        }
        else if(status==2){
            arr={
                    cName:'payed',
            txt:'已付款'
                };//
            return <span className="order-status-payed">{arr.txt}</span>;
        }
        else if(status==3){
            arr={
                cName:'done',
                txt:'已发货'
                };//
            return <span className="order-status-done">{arr.txt}</span>;
        }
        else if(status==4){
            arr={
                cName:'unstock',
            txt:'缺货'
                };//
            return <span className="order-status-unstock">{arr.txt}</span>;
        }
       

    }
    getBtns(status){
        let arr=[
            {
                cName:'done',
                txt:'发货'
            },{
                cName:'unstock',
                txt:'缺货'
            }
        ];
        
        if(status==2 || status==4){
            if(status==2){
            return <span className="order-btn-done">{arr[0].txt}</span>;   
            }
            return <span className="order-btn-unstock">{arr[1].txt}</span>;
        }else{
            return '';
        }
    }
    render(){
        let tableHeads = ['订单号','订单状态','订单总价','创建时间','操作'];
        return (
            <div id="page-wrapper">
                <PageTitle title="订单列表"/>
                <ListSearch onSearch={(orderNumber) => {this.onSearch(orderNumber)}}/>
                <TableList tableHeads={tableHeads}> 
                    {
                        this.state.data.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                    <Link to={'/order/detail/'+order.order_no}>{order.order_no}</Link>
                                    </td>
                                    <td>{this.getOrderStatus(order.status)}
                                    {this.getBtns(order.status)}</td>
                                    <td>￥{order.total_price}</td>
                                    <td>{order.create_time}</td>                                  
                                    <td>
                                        <Link to={'/order/detail/'+order.order_no}>详情</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                
              
        
               
                <Pagination current={this.state.pageNum} 
                total={this.state.total} 
                onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
    
}

export default OrderList;