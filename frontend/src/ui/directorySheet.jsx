import React from "react";
import SearchInput from "../components/searchInput";
import DirectoryDataSheetItem from "../components/directory_data_sheet_item";
import "../css/directory_data_sheet.css"
import { connect } from "react-redux";
import { addEmployees } from "../redux/directorySlice";
import axios from "axios";


class DirectoryDataSheet extends React.Component {
    // Constructor 
    constructor(props){
        super(props)
        this.state = {
            search_text : ""
        }

        this.handleSearch = this.handleSearch.bind(this)
        this.getRenderedRecords = this.getRenderedRecords.bind(this)
        this.requestGetEmployees = this.requestGetEmployees.bind(this)
    }

    // Component mounted 
    componentDidMount(){
        // Get employees to render 
        this.requestGetEmployees();
    }

    // Request - Get employees 
    requestGetEmployees(){
        // Set the context 
        const context = this;
        console.log(process.env.BASE_URL)
        // Request 
        axios.get('/api/v1/employee')
            .then(response => {
                //Dispatch add employees  
                this.props.addEmployees(response.data)
            })
            .catch(error=>{
                alert("Failed To Get Employees")
                console.log(error)
            })
    }

    // Handle Search 
    handleSearch(payload){
        // Request 
        axios.get(`/api/v1/employee/?full_name=${payload}`)
        .then(response => {
            //Dispatch add employees  
            this.props.addEmployees(response.data)
        })
        .catch(error=>{
            alert("Failed To Get Employees")
            console.log(error)
        })
    }

    // Get Records 
    getRenderedRecords(){
        return this.props.directory.map((rec)=>{
            return (
                <DirectoryDataSheetItem key={rec.id} data={rec}/>
            )
        })
    }

    // Render Method 
    render(){
        return (
            <div className="directory-data-sheet">
                <div className="">
                    <SearchInput onChange={this.handleSearch} />
                </div>
                {/* Header */}
                <div className="data-header">
                    <div className=""></div>
                    <div className="">Full Name</div>
                    <div className="">Employee Id.</div>
                    <div className="">Department</div>
                    <div className="">Role</div>
                    <div className="">Last Updated.</div>
                </div>
                <div className="separator"></div>
                {/* Entries */}
                {this.getRenderedRecords()}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        directory: state.directory.employees
    }
}

const mapDispatchToProps = {
    addEmployees : addEmployees
}

export default connect(mapStateToProps,mapDispatchToProps)(DirectoryDataSheet)