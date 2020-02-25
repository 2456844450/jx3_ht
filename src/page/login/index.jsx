import React from 'react';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx'

import './index.scss';

const _mm = new MUtil();
const _user = new User();


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            redirect : _mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = '登录 - ADMIN';
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    // 当用户名发生改变
    onInputChange(e){
        
        let inputName = e.target.name;
        let inputValue = e.target.value;
        
        this.setState({
            [inputName]: inputValue
        });
    }
    //当用户提交表单
    onSubmit(){
        let loginInfo = {
            username:this.state.username,
            password:this.state.password
        }
        let checkResult = _user.checkLoginInfo(loginInfo);
        if(checkResult.status){
            _user.login({
                ac:this.state.username,
                se:this.state.password
            }).then((res) => {
                _mm.setStorage('userInfo',res);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        else{
            _mm.errorTips(checkResult.msg);
        }
        
    }
    
    render() {
        return (

            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - 商户管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                
                                <input type="text" 
                                name="username"
                                className="form-control" 
                                placeholder="请输入用户名"
                                onKeyUp = {e => this.onInputKeyUp(e)}
                                onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                   
                                    <input type="password" 
                                    name="password"
                                    className="form-control" 
                                    placeholder="请输入密码"
                                    onKeyUp = {e => this.onInputKeyUp(e)}
                                    onChange={e => this.onInputChange(e)}/>
                            </div>
                            
                            
                            <button className="btn btn-lg btn-primary btn-block"
                            onClick={e => {this.onSubmit(e)}}>登陆</button>
                        </div>
                        
                    </div>
                </div>
            </div>


                            );
                        }
                    }
                    
export default Login;