import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
class User{
    login(loginInfo){
        return _mm.request({
            type: 'post',
            url: '/api/v1/token/app', //?XDEBUG_SESSION_START=19405
            data: loginInfo
        })
    }
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        if(typeof username !== 'string' || username.length === 0)
        {
            return {
                status: false,
                msg: '用户名不能为空！'
            }
        }
        if(typeof password !== 'string' || password.length === 0)
        {
            return {
                status: false,
                msg: '密码不能为空！'
            }
        }
        return {
            status: true,
            msg:'验证通过！'
        }
    }
    getUserList(pageNum){
        return _mm.request({
            type : 'post',
            url  : '/api/v1/manage/user',
            data : {
                page : pageNum
            }
        });
    }
    
    
}
export default User;