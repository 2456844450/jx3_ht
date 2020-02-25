import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Order from 'service/order-service.jsx'
import MUtil from 'util/mm.jsx';
import TableList from 'util/table-list/index.jsx';

import './detail.scss';
const _mm = new MUtil();
const _order = new Order();

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: this.props.match.params.orderNo,
            orderInfo: {}
        }
    }
    componentDidMount() {
        this.loadOrderDetail();
    }
    loadOrderDetail() {
        _order.getOrderDetail(this.state.orderNo).then((res) => {
            this.setState({
                orderInfo: res
            });

        }, (errMsg) => {
            _mm.errorTips(errMsg);
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
            return <span className="order-status-done" 
            >{arr.txt}</span>;
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
            return <span className="order-btn-done" 
            onClick={(e) => {this.onSendGoods(e)}}>{arr[0].txt}</span>;   
            }
            return <span className="order-btn-unstock">{arr[1].txt}</span>;
        }else{
            return '';
        }
    }
    onSendGoods(){
        if(window.confirm('是否确认发货？')){
            _order.sendGoods(this.state.orderNo).then((res) => {
                _mm.successTips('发货成功');
                this.loadOrderDetail();
            }, (errMsg) => {
                _mm.errorTips('errMsg');
            });
        }
    }
    render() {
        let productList = this.state.orderInfo.snap_items || [];
        let user = this.state.orderInfo.snap_address || [];
        let tableHeads = [
            {name: '商品图片', width: '10%'},
            {name: '商品名称', width: '45%'},
            {name: '单价', width: '15%'},
            {name: '数量', width: '15%'},
            {name: '合计', width: '15%'},
        ]; 
        let tableHead = [
            {name: '姓名', width: '10%'},
            {name: '电话', width: '50%'},
            {name: '省份', width: '10%'},
            {name: '城市', width: '10%'},
            {name: '区域', width: '10%'},
            {name: '详情', width: '10%'}
        ]; 
       
        return (
            <div id="page-wrapper">
                <PageTitle title="订单详情" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.order_no}</p>

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.create_time}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                            {this.getOrderStatus(this.state.orderInfo.status)}
                            {
                                this.getBtns(this.state.orderInfo.status)
                            }</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">￥{this.state.orderInfo.total_price}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品列表</label>
                        <div className="col-md-10">
                            <TableList tableHeads={tableHeads}>
                                {
                                    productList.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img className="p-img" src={product.main_img_url}
                                                     alt={product.name}/>
                                                </td>
                                                <td>{product.name}</td>
                                                <td>￥{product.price}</td>
                                                <td>
                                                    {product.counts}
                                                </td>

                                                <td>
                                                    {product.totalPrice}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </TableList>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">顾客详情信息</label>
                        <div className="col-md-10">
                            <p className="form-control-static">{user.name}</p>
                            <p className="form-control-static">{user.mobile}</p>
                            <p className="form-control-static">{user.province}{user.city}{user.country}</p>
                            <p className="form-control-static">{user.detail}</p>        
                            
                        </div>
                    </div>
                    
                </div>
            </div>

        );
    }
}



export default OrderDetail;