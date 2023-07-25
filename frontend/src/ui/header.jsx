//header.jsx
import React from "react";
import Button from "../components/buttons";
import "../css/header.css"

class HeaderComponent extends React.Component {
    // Constructor 
    constructor(props){
        super(props)
    }
    
    // Render Method 
    render(){
        return (
            <div className="header-component-wrapper">
                <div className="heading text-heading-1">People</div>
                <div className="button-wrapper">
                   {this.props.parent_displaying != "ADD_EMPLOYEE" ? <Button title="Add Employee" type="primary" onClick={()=>{this.props.onAddEmployee();}}/> : <div></div>}
                </div>
            </div>
        )
    }
}

export default HeaderComponent