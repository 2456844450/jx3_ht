import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';

// 通用富文本编译器，依赖jquery
class RichEditor extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.loadEditor();
    }
    componentWillReceiveProps(nextProps){
        
        
    }
    loadEditor(){
        let element = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea: $(element),
            defaultValue: this.props.placeholder || '请输入内容',
            upload: {
                url:'/api/v1/product/richtext_img_upload',
                defaultImage : '',
                fileKey : 'upload_file'
            }
        });
        this.bindEditorEvent();

    }
    // 初始化富文本编译器的事件
    bindEditorEvent(){
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue());
        })
    }
    render(){
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        );
    }
}
export default RichEditor;