import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss';
const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.pid,
            name : '',
            subtitle : '',
            categoryId : 0,
            subImages : [],
            price : '',
            stock : '',
            detail : '',
            status : 1 //商品状态1 在售
        }
    }
    componentDidMount(){
        this.loadProduct();
    }
    loadProduct(){
        if(this.state.id){
            let productInfo = {
                id : this.state.id
            };
            _product.getProduct(productInfo).then((res) => {
                let images = res.subImages;
                res.subImages = images.map((imgUri) => {
                    return {
                        uri:imgUri,
                        url:res.imageHost + imgUri
                    }
                });
                
                res.detail='';
                this.setState(res);
                
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    简单字段的改变
    onValueChange(e){
        let name = e.target.name;
        let value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    onCategoryChange(categoryId){
        this.setState({
            categoryId: categoryId
        });
       
    }
    onUploadSuccess(res){
        
        let subImages =this.state.subImages;
       
        subImages.push(res);
        this.setState({
            subImages : subImages
        });
        
    }
    onUploadError(errMsg){
        _mm.errorTips(errMsg);
    }
    onImageDelete(e,url){
        let index = parseInt(e.target.getAttribute('index'));
        let subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages : subImages
        });
        let productInfo = { 
            url: url
         };
        _product.deleteFile(productInfo).then(res => {
            
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    onDetailValueChange(value){
        
        this.setState({
            detail: value
        });
    }
    getsubImagesString(){
        let array = this.state.subImages.map((image) => image.uri);
        
        return array[0];
    }
    // 提交表单
    onSubmit(){
        let product = {
            name : this.state.name,
            subtitle : this.state.subtitle,
            categoryId : parseInt(this.state.categoryId),
            subImages : this.getsubImagesString(),
            detail : this.state.detail,
            price : parseFloat(this.state.price),
            stock : parseInt(this.state.stock),
            status : this.state.status,
        };
        
        let productCheckResult = _product.checkProduct(product);
        // 表单验证成功
        if(productCheckResult.status){
            _product.saveProduct(product).then((res)=>{
                _mm.successTips(res);
                this.props.history.push('/product/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
        // 表单验证失败
        else{
            _mm.errorTips(productCheckResult.msg);
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑商品' : '添加商品'} />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品名称"
                            name="name"
                            value={this.state.name}
                            onChange={(e) => this.onValueChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品描述"
                            name="subtitle"
                            value={this.state.subtitle}
                            onChange={(e) => this.onValueChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector
                            categoryId = {this.state.categoryId}
                         onCategoryChange = {
                            (categoryId) => this.onCategoryChange(categoryId)}></CategorySelector>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="价格"
                                name="price"
                                value = {this.state.price}
                                onChange={(e) => this.onValueChange(e)} />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="库存" 
                                name="stock"
                                value={this.state.stock}
                                onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map(
                                    (image,index) => (
                                        <div className="img-con" key={index}>
                                            <img  className="img" src={image.url} />
                                            <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e,image.uri)}></i>
                                        </div>
                                    )
                                ) : (<div>还没有商品的照片啊，赶快上传啊~</div>)
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadSuccess(res)} 
                             onError={(errMsg) => this.onUploadError(errMsg)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor 
                            
                            
                            onValueChange={(value) => this.onDetailValueChange(value)}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" 
                            onClick={(e) => {this.onSubmit(e)}}>提交</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


export default ProductSave;