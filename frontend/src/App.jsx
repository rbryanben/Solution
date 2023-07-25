import React from "react";
import "./css/app.css"
import "./css/buttons.css"
import { connect } from "react-redux";
import { addEmployer } from "./redux/employersSlice";
import axios from "axios";



// UI Components 
import HeaderComponent from "./ui/header";
import DataSelector from "./ui/dataSelector";
import DirectoryDataSheet from "./ui/directorySheet";
import AddEmployeeComponent from "./ui/addEmployee";

// Components That Can Be Rendered 
const APP_RENDERABLE_COMPONENTS =  {
    DIRECTORY : "DIRECTORY",
    DEPARTMENTS : "DEPARTMENTS",
    ADD_EMPLOYEE : "ADD_EMPLOYEE"
}

const baseURL = "http://localhost:8000"


// Application
class App extends React.Component {
    // Constructor
    constructor(props){
        super(props);
      
        // State 
        this.state = {
            selected_data_index : 0,
            displaying : APP_RENDERABLE_COMPONENTS.DIRECTORY
        }

        axios.defaults.baseURL = baseURL;

        // Bind Methods
        this.dataTypeChange = this.dataTypeChange.bind(this)
        this.getChildToRender = this.getChildToRender.bind(this)
        this.addEmployee = this.addEmployee.bind(this)
        this.cancelAddEmployee  = this.cancelAddEmployee.bind(this)
    }

    // Data Type Change: Handles all data type changes 
    dataTypeChange(payload){
        this.setState({
            selected_data_index: payload
        })
    } 

    // Add Employee
    addEmployee(){
        this.setState({
            ...this.state,
            displaying: APP_RENDERABLE_COMPONENTS.ADD_EMPLOYEE
        })
    }

    // Cancel Add Employee 
    cancelAddEmployee(){
        this.setState({
            ...this.state,
            displaying: APP_RENDERABLE_COMPONENTS.DEPARTMENTS
        })
    }

    // Returns the child component to render 
    getChildToRender(){
        switch(this.state.displaying){
            case APP_RENDERABLE_COMPONENTS.DIRECTORY:
                return <DirectoryDataSheet />
            case APP_RENDERABLE_COMPONENTS.ADD_EMPLOYEE:
                return <AddEmployeeComponent onCancel={this.cancelAddEmployee} />
            default:
                return <DirectoryDataSheet />
        }
    }
    
    // Render Method
    render(){
      // Return view
      return (
        <div className="App" >
            {/* Header */}
            <div className="people-wrapper">
                <HeaderComponent onAddEmployee={this.addEmployee} parent_displaying={this.state.displaying}/>
            </div>
            {/* Data Selection */}
            <div className="data-selector-wrapper">
                <DataSelector onSelectedIndexChanged={this.dataTypeChange} index={this.state.selected_data_index} />
            </div>

            {/* Data Sheet */}
            <div className="data-sheet-wrapper">
                {this.getChildToRender()}
            </div>
        </div>
      )
    }
}

// Map State To Props 
const mapStateToProps = (state) =>{
    return {
        employers: state.employers.list
    }
}

const mapDispatchToProps = {
    addEmployee : addEmployer
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
