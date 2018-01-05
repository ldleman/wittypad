import React from 'react';
import './App.css';

class SidePanel extends React.Component{
       constructor(props) {
          super(props);
          this.state = {  };
        }

      render() {
          return (
            <div>
            	<h3 className="title">Outils</h3>
	            <ul className="menu">
	            	<li><i className="fa fa-pencil"></i> Home</li>
	            </ul>
            </div>
          );
        
     }
}

export default SidePanel;