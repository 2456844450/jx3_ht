import React from 'react';
import { Link } from 'react-router-dom';
import User from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import './index.scss';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            data : [],
            pageNum : 1
            
        };
    }
    componentDidMount(){
        this.loadUserList();
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
            
          
        },errMsg => {
            this.setState({
                data : []
            })
            _mm.errorTips(errMsg);
        });
    }
    // 当页数变化时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadUserList();
        });
    }
    render(){
        let listBody = this.state.data.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.mobile}</td>
                    <td>{user.province}</td>
                    <td>{user.city}</td>
                    <td>{user.country}</td>
                    <td>{user.detail}</td>
                    <td>{new Date(user.update_time).toLocaleString()}</td>
                </tr>
            );
        });
        
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                
                <TableList tableHeads={['ID','姓名','电话','省份','城市','区域','详细信息','注册时间']}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} 
                total={this.state.total} 
                onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
    
}

export default UserList;