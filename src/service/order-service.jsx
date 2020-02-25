import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
class Order{
    // 获取订单列表
    getOrderList(listParam){
        let url = '';
        let data = {};
        if(listParam.listType === 'list'){
            url = '/api/v1/order/list';
            data.pageNum = listParam.pageNum;
        }
        else if(listParam.listType === 'search'){
            url = '/api/v1/order/list';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
            
        }
        return _mm.request({
             type : 'post',
             url  : url,
             data : data
        });
    }
    getOrderDetail(orderNo){
        return _mm.request({
            type : 'post',
            url  : '/api/v1/order/detail',//?XDEBUG_SESSION_START=19769
            data : {
                orderNo : orderNo
            }
       });
    }
    sendGoods(orderNo){
        return _mm.request({
            type : 'post',
            url  : '/api/v1/order/delivery',//?XDEBUG_SESSION_START=19769
            data : {
                orderNo : orderNo
            }
       }); 
    }
    
}
export default Order;