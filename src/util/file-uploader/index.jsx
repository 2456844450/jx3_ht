import React from 'react';
import MUtil from 'util/mm.jsx';


import FileUpload from './react-fileupload.jsx';
const _mm = new MUtil();
class FileUploader extends React.Component{
    render(){
        /*set properties*/
        const options={
            baseUrl:'/api/v1/product/upload',//?XDEBUG_SESSION_START=19405
            fileFieldName : 'upload_file',
            dataType : 'json',
            chooseAndUpload : true,
            uploadSuccess : (res) => {
                if(0 === res.status){
                    this.props.onSuccess(res.data);
                }
                else{
                    _mm.errorTips(res.msg);
                }
                
            },
            uploadError : (err) => {
                this.props.onError(err.massage || '上传图片出错啦');
            }
        }
        
        return (
            <FileUpload options={options}>
                <button className="btn btn-xs btn-default" ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )	        
    }
}
export default FileUploader;
