import React from 'react';
import './App.css';

class Editor extends React.Component{
       constructor(props) {
          super(props);
          this.state = {  };
        }

      render() {
          return (
            <div>
              <ul className="editor-tab">
                <li><i className="fa fa-file-text-o"></i> Roman.html * <i className="fa fa-times"></i></li>
              </ul>
              <ul className="editor-toolbar">
              <li  data-command='undo'><i className='fa fa-undo'></i></li>
              <li  data-command='redo'><i className='fa fa-repeat'></i></li>
                <li  data-command='bold'><i className='fa fa-bold'></i></li>
                <li  data-command='italic'><i className='fa fa-italic'></i></li>
                <li  data-command='underline'><i className='fa fa-underline'></i></li>
                <li  data-command='strikeThrough'><i className='fa fa-strikethrough'></i></li>
                <li  data-command='justifyLeft'><i className='fa fa-align-left'></i></li>
                <li  data-command='justifyCenter'><i className='fa fa-align-center'></i></li>
                <li  data-command='justifyRight'><i className='fa fa-align-right'></i></li>
                <li  data-command='justifyFull'><i className='fa fa-align-justify'></i></li>
                <li  data-command='indent'><i className='fa fa-indent'></i></li>
                <li  data-command='outdent'><i className='fa fa-outdent'></i></li>
                <li  data-command='insertUnorderedList'><i className='fa fa-list-ul'></i></li>
                <li  data-command='insertOrderedList'><i className='fa fa-list-ol'></i></li>
                <li  data-command='h1'>H1</li>
                <li  data-command='h2'>H2</li>
                <li  data-command='insertimage'><i className='fa fa-image'></i></li>
                <li  data-command='p'>P</li>
                <li  data-command='subscript'><i className='fa fa-subscript'></i></li>
                <li  data-command='superscript'><i className='fa fa-superscript'></i></li>
              </ul>
            <div className="editor-area" contentEditable></div></div>
          );
        
     }
}

export default Editor;