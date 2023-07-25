import React from "react";
import Button from "../components/buttons";
import axios from "axios";

class AddEmployeeComponent extends React.Component {
    state = {
        record: {
            fullName: "",
            employeeId: "",
            department: "",
            profilePicture: "",
            company: "",
            title: "",
            dateStarted: "",
            dateLeft: "",
            duties: "",
        },
        file: null,
        file_name: null
    };

    constructor(props){
        super(props)
        this.save_record = this.save_record.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleUpload = (event) => {
        this.setState({
          file: event.target.files[0],
          file_name: event.target.files[0].name
        });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            record: {
                ...this.state.record,
                [name]: value,
            },
        });
    };

    save_record(){
        // Individual upload 
        if (this.state.file == null){
            axios.post('/api/v1/employee/',this.state.record).then(res => {
                // Close 
                alert("Saved Employee")
                this.props.onCancel()
            }).catch(err => {
                switch(err.response.status){
                    case 409:
                        alert("Employee Exists: Duplicate Employee Id.")
                        break
                    default:
                        alert("Opps Something Went Wrong")
                }
            })
            return;
        }

        // Upload file 
        const formData = new FormData();
        formData.append('file', this.state.file);

        axios.post('/api/v1/uploads/csv/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        })
        .then((response) => {
            alert("Success: Uploaded Employees")
            this.props.onCancel();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    uploadFile(){
        document.getElementById("add-employee-input").click()
    }

    render(){
        return(
            <div>
                <Button title="Excel Upload" onClick={this.uploadFile} icon="fa-solid fa-upload" type="secondary"/>
                <input id="add-employee-input" type="file" name="file" onChange={this.handleUpload} hidden />
                {this.state.file == null && <div className="text-back" style={{marginLeft:10,marginTop:20,fontSize:"small",opacity:0.8,marginBottom:20}}>Personal information</div>}
                {this.state.file == null && 
                <div className="add-employee-component" style={{fontSize:"0.9rem"}}>
                        {/* Fullname  */}
                        <div className="datasheet-editable" >
                            <div className="">Full Name</div>
                            <div className="div">
                                <input type="text" placeholder="Full Name" name="fullName" value={this.state.record.fullName} onChange={this.handleChange} className="plain-input" />
                            </div>
                        </div>

                        {/* Employeed Id. */}
                        <div className="datasheet-editable" >
                            <div className="">Employeed Id.</div>
                            <div className="div">
                                <input type="text" placeholder="Employee Id." name="employeeId" value={this.state.record.employeeId} onChange={this.handleChange} className="plain-input" />
                            </div>
                        </div>


                        {/* Department */}
                        <div className="datasheet-editable" >
                            <div className="">Department</div>
                            <div className="div">
                                <input type="text" placeholder="Department" name="department" value={this.state.record.department} onChange={this.handleChange}  className="plain-input" />
                            </div>
                        </div>

                        {/* Profile Picture*/}
                        <div className="datasheet-editable" style={{gridColumn:"span 3"}} >
                            <div className="">Profile Picture</div>
                            <div className="div">
                                <input type="text" placeholder="Profile URL" style={{width:"50%"}} name="profilePicture" value={this.state.record.profilePicture} onChange={this.handleChange}  className="plain-input" />
                            </div>
                        </div> 
                </div> }

                {this.state.file == null && <div className="text-back" style={{marginLeft:10,fontSize:"small",opacity:0.8,marginBottom:20,marginTop:20}}>Previous role</div>}
                {/* Current Role */}
                {this.state.file == null && 
                <div className="add-employee-component" >
                    {/* Username */}
                    <div className="datasheet-editable" >
                        <div className="">Company</div>
                        <div className="div">
                            <input type="text" placeholder="Company" name="company" value={this.state.record.company} onChange={this.handleChange} className="plain-input" />
                        </div>
                    </div>

                    {/* Employeed Id. */}
                    <div className="datasheet-editable" >
                        <div className="">Title (Position)</div>
                        <div className="div">
                            <input type="text" placeholder="Titles" name="title" value={this.state.record.title} onChange={this.handleChange} className="plain-input" />
                        </div>
                    </div>

                    {/* Date Started */}
                    <div className="datasheet-editable" style={{transform:"translateY(-1px)"}} >
                        <div className="">Date Started.</div>
                        <div className="div">
                            <input type="date" name="dateStarted" value={this.state.record.dateStarted} onChange={this.handleChange} className="plain-input" />
                        </div>
                    </div>

                    {/* Date Left */}
                    <div className="datasheet-editable" style={{transform:"translateY(-1px)"}} >
                        <div className="">Date Left.</div>
                        <div className="div">
                            <input type="date" name="dateLeft" value={this.state.record.dateLeft} onChange={this.handleChange}  className="plain-input" />
                        </div>
                    </div>

                    {/* Date Left */}
                    <div className="datasheet-editable" style={{transform:"translateY(-1px)"}} >
                    </div>

                    {/* Duties */}
                    <div className="datasheet-editable" style={{gridColumn:"span 3"}}>
                        <div className="">Duties.</div>
                        <div className="div">
                            <textarea type="text" name="duties" value={this.state.record.duties} onChange={this.handleChange} placeholder="Tell us about your duties." className="plain-input" style={{width:"60%",height:"150px"}}/>
                        </div>
                    </div>
                </div> }
                
                {this.state.file != null && <div style={{marginLeft:10,marginTop:10,fontSize:"small"}}>{this.state.file_name}</div>}
                <div className="add-employee-component">
                    <div className="" style={{display:"flex",marginTop:0}}>
                        <Button type="warn" onClick={this.props.onCancel} title="Cancel" icon="fa-solid fa-xmark"/>
                        <span style={{marginLeft: 10}}></span>
                        <Button type="primary" title="Save Record" onClick={this.save_record} icon="fa-solid fa-floppy-disk" hint="Save Record"/>
                    </div>
                </div>

            </div>
        )
    }
}

export default AddEmployeeComponent