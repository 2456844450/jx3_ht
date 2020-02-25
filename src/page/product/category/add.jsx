import React from 'react';
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';
import FileUploader from 'util/file-uploader/index.jsx';




const _mm = new MUtil();
const _product = new Product();

class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            categoryName: '',
            subImages: []


        };
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    loadCategoryList() {
        _product.getCategoryList().then(res => {
            this.setState({ categoryList: res });


        }, errMsg => {
            _mm.errorTips(errMsg);
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
    getsubImagesString(){
        let array = this.state.subImages.map((image) => image.uri);
        
        return array[0];
    }
    onValueChange(e){
        let name = e.target.name;
        let value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    // 提交表单
    onSubmit(e) {

        let product = {
            categoryName : this.state.categoryName.trim(),
            subImages : this.getsubImagesString()
        }
        if (product.categoryName && product.subImages) {
            _product.saveCategory(product).then((res) => {
                _mm.successTips(res);
                this.props.history.push('/product-category/index');
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        } 
        else if(!product.categoryName){
            _mm.errorTips('品类名称不能为空');
        }
        else {
            _mm.errorTips('品类图片不能为空');
        }
    }

    render() {

        return (
            <div id="page-wrapper">
                <PageTitle title="添加品类" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" placeholder="请输入品类名称"
                                        name="categoryName"
                                        value={this.state.categoryName}
                                        onChange={(e) => this.onValueChange(e)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类图片</label>
                                <div className="col-md-10">
                                    {
                                        this.state.subImages.length ? this.state.subImages.map(
                                            (image, index) => (
                                                <div className="img-con" key={index}>
                                                    <img className="img" src={image.url} />
                                                    <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e, image.uri)}></i>
                                                </div>
                                            )
                                        ) : (<div>还没有商品的照片啊，赶快上传啊~</div>)
                                    }
                                </div>
                                <div className="col-md-offset-2 col-md-10 file-upload-con">
                                    <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                        onError={(errMsg) => this.onUploadError(errMsg)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-primary"
                                        onClick={(e) => { this.onSubmit(e) }}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

}

export default CategoryAdd;