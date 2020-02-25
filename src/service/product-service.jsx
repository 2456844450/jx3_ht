import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
class Product{
    // 获取用户列表
    getProductList(listParam){
        let url = '';
        let data = {};
        if(listParam.listType === 'list'){
            url = '/api/v1/product/by_category/paginate';
            data.pageNum = listParam.pageNum;
        }
        else if(listParam.listType === 'search'){
            url = '/api/v1/product/search';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
            
        }
        return _mm.request({
             type : 'post',
             url  : url,
             data : data
        });
    }
    setProductStatus(productInfo){
        
        return _mm.request({
            type : 'post',
            url  : '/api/v1/product/set_sale_status',
            data : productInfo
        });
    }
    // 检查保存商品的表单
    checkProduct(product){
        let result = {
            status : true,
            msg: '验证通过'   
        };
        if(typeof product.name !== 'string' || product.name.length === 0)
        {
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        if(typeof product.subtitle !== 'string' || product.subtitle.length === 0)
        {
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
       
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0))
        {
            return {
                status: false,
                msg: '请选择正确的商品品类！'
            }
        }
        if(typeof product.price !== 'number' || !(product.price >= 0))
        {
            return {
                status: false,
                msg: '商品价格不合法！'
            }
        }
        if(typeof product.stock !== 'number' || !(product.stock >= 0))
        {
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
        
        return result;


    }
    // 保存商品
    saveProduct(product){
        return _mm.request({
            type : 'post',
            url : '/api/v1/product/save',
            data : product
        });
    }
    // 品类相关
    getCategoryList(){
        return _mm.request({
            type : 'get',
            url : '/api/v1/category/all'
        });
    }

    // 删除图片
    deleteFile(productInfo){
        return _mm.request({
            type : 'post',
            url  : '/api/v1/product/deletefile',
            data : productInfo
        });
    }
    // 得到一个产品
    getProduct(productInfo){
        return _mm.request({
            type : 'post',
            url : '/api/v1/product/detail',
            data : productInfo
        });
    }
    saveCategory(product){
        return _mm.request({
            type : 'post',
            url : '/api/v1/product/add_category',
            data : product
        });
    }
    updateCategoryName(product){
        return _mm.request({
            type : 'post',
            url : '/api/v1/category/update_category',
            data : product
        });
    }
    
}
export default Product;