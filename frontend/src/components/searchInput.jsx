import React from "react";

class SearchInput extends React.Component {
    // Constructor 
    constructor(props){
        super(props)
        this.state = {
            focused: false
        }

        this.onChange = this.onChange.bind(this)
    }

    //Text Changed 
    onChange(e){
        let text = e.target.value 
        // If text is empty retract 
        if (text === ""){
            this.setState({focused: false})
        }
        else {
            this.setState({focused: true})
        }

        // Callback to the parent 
        this.props.onChange(text)
    }
    // Render Method 
    render(){
        let className = "search-input ";
        if (this.state.focused) className += "focused"
        return (
            <div className={className}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input placeholder="Search" type="text" required onBlur={(e)=>{ e.target.value === "" ? this.setState({focused: false}) : this.setState({focused: true})}} 
                    onFocus={(e)=>{this.setState({focused: true})}} onChange={this.onChange} />
            </div>
        )
    }
}

export default SearchInput
