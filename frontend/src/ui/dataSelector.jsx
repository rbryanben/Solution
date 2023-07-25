import React from "react";
import "../css/data_selector.css"

class DataSelector extends React.Component {
    // Constructor
    constructor(props){
        super(props)
        this.state = {
            inner_width: 72
        }
    }

    setSelected(index,width){
        this.setState({
            inner_width: width
        })
        
        // Callback to the parent 
        this.props.onSelectedIndexChanged(index)
    }

    // Render Method
    render(){
        return (
            <div className="data-selector-wrapper">
                <div className="tabs text-heading-2">
                    {this.props.index == 0 ? 
                        <div className="tab selected" onClick={()=>{this.setSelected(0,72)}}>Directory</div>
                        : <div className="tab" onClick={()=>{this.setSelected(0,72)}}>Directory</div>}
                    {this.props.index == 1 ? 
                        <div className="tab selected" onClick={()=>{this.setSelected(1,86)}}>Companies</div>
                        : <div className="tab" onClick={()=>{this.setSelected(1,86)}}>Companies</div>}
                    {this.props.index == 2 ? 
                        <div className="tab selected" onClick={()=>{this.setSelected(2,98)}}>Departments</div>
                        : <div className="tab" onClick={()=>{this.setSelected(2,98)}}>Departments</div>}
                </div>                    

                {/* Slider */}
                <div className="slider" >
                    <div className="inner" style={{marginLeft: (this.props.index  * 110), width: this.state.inner_width}}>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default DataSelector