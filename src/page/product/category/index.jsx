import React from 'react';
import { Link } from 'react-router-dom';
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';




const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],


        };
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    loadCategoryList() {
        _product.getCategoryList().then(res => {
            this.setState({ data: res });


        }, errMsg => {
            this.setState({
                data: []
            })
            _mm.errorTips(errMsg);
        });
    }
    // 更新品类的名字
    onUpdateName(categoryName) {
        let newName = window.prompt('请输入新的品类名称', categoryName);
        if (newName) {
            _product.updateCategoryName({
                categoryName: categoryName,
                newName: newName
            }).then(res => {
                _mm.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render() {
        let listBody = this.state.data.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                            onClick={(e) => this.onUpdateName(category.name)}>
                            修改名称
                        </a>
                    </td>
                </tr>
            );
        });

        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to='/product-category/add' className="btn btn-primary">
                            <i className="fa fa-plus">

                            </i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <TableList tableHeads={['品类ID', '品类名称', '操作']}>
                    {listBody}
                </TableList>

            </div>
        );
    }

}

export default CategoryList;