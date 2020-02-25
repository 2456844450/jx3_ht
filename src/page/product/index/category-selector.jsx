import React from 'react';
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const _product = new Product();
import './category-selector.scss';

class CategorySelector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            CategoryList : [],
            CategoryId : 0
        }
    }

    componentDidMount(){
        this.loadCategory();
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange = nextProps.categoryId !== this.props.categoryId;
        // 数据没有发生变化的时候直接不做处理
        if(!categoryIdChange){
            return;
        }
        this.setState({
            CategoryId:nextProps.categoryId
        });
    }
    // 加载分类
    loadCategory(){
        _product.getCategoryList().then(res => {
            this.setState({
                CategoryList : res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    onCategoryChange(e){
        if(this.props.readOnly)
            return;
        let newValue = e.target.value || 2;
        this.setState({
            CategoryId : newValue
        },() => {
            this.onPropsCategoryChange();
        });
    }
    onPropsCategoryChange(){
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        categoryChangable && this.props.onCategoryChange(this.state.CategoryId);
    }
    render() {
        return (

            <div className="col-md-10">
                <select name="" className="form-control cate-select" 
                value = {this.state.CategoryId}
                onChange = {(e) => this.onCategoryChange(e)}
                readOnly = {this.props.readOnly}>
                    <option value="">请选择分类</option>
                    {
                        this.state.CategoryList.map(
                            (category, index)=> <option value={category.id} key={index}>{category.name}</option>)
                    }
                </select>
            </div>




        );
    }
}


export default CategorySelector;