import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
class Statistic{
    //首页数据统计
    getHomeCount(){
        return _mm.request({
            type: 'get',
            url: '/api/v1/statistics', //?XDEBUG_SESSION_START=19405
            
        })
    }
    
    
    
}
export default Statistic;