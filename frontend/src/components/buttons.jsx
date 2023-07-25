import React from "react";

// Button Class 
class Button extends React.Component {
    render(){
        return(
            <div className={"button " + this.props.type}  title={this.props.hint} onClick={this.props.onClick}>
                <i className={this.props.icon} style={{marginRight: "5px"}}></i> {this.props.title}
            </div>
        )
    }
}



export default Button