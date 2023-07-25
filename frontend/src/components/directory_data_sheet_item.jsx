import React from "react";
import Button from "./buttons";
import axios from "axios";

class DirectoryDataSheetItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            expanded : false,
            data: this.props.data,
            roles: this.props.data.roles[0] 
        }
    
        this.toogle = this.toogle.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.onUpdateRole = this.onUpdateRole.bind(this)
        this.updateRecord = this.updateRecord.bind(this)
    }

    toogle(){
        this.setState({
            expanded: !this.state.expanded
        })
    }

    onUpdate(e){
        const {name,value} = e.target

        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value
            }
        })
        
    }

    onUpdateRole(e){
        const {name,value} = e.target


        this.setState({
            ...this.state,
            roles: {
                ...this.state.roles,
                [name] : value
            }
        })
    }

    updateRecord(){
        axios.put("/api/v1/employee/",this.state)
            .finally(response => {
                this.toogle()
            })
            .catch(err => {
                alert("Something Went Wrong: Failed To Update")
                console.log(err)
            })
    }
    
    render(){
        if (this.state.expanded){
            let date_started = this.state.roles != null ? this.state.roles.date_started : null
            let date_left = this.state.roles != null ? this.state.roles.date_left : null
            
            return (
                <div className="data-entry expand" hint="Click To Expand" >
                   {/* Username */}
                    <div className="datasheet-editable" >
                        <div className="">Full Name</div>
                        <div className="div">
                            <input type="text" name="full_name" onChange={this.onUpdate} value={this.state.data.full_name} className="plain-input" />
                        </div>
                    </div>

                    {/* Employeed Id. */}
                    <div className="datasheet-editable" >
                        <div className="">Employeed Id.</div>
                        <div className="div">
                            <input type="text" name="employee_id" onChange={this.onUpdate} value={this.state.data.employee_id} className="plain-input" />
                        </div>
                    </div>


                    {/* Department */}
                    <div className="datasheet-editable" >
                        <div className="">Department</div>
                        <div className="div">
                            <input type="text" name="department" onChange={this.onUpdate} value={this.state.data.department} className="plain-input" />
                        </div>
                    </div>

                    {/* Roles Title */}
                    <div className="datasheet-editable" >
                        <div className="">Current Role</div>
                        <div className="div">
                            <input type="text" name="title" onChange={this.onUpdateRole}  value={this.state.roles != null ? this.state.roles.title : "Not Found"} className="plain-input" />
                        </div>
                    </div>

                    {/* Company */}
                    <div className="datasheet-editable" >
                        <div className="">Company</div>
                        <div className="div">
                            <input type="text" name="company" onChange={this.onUpdateRole} value={this.state.roles != null ? this.state.roles.company : "Not Found"} className="plain-input" />
                        </div>
                    </div>

                    {/* Date Started */}
                    <div className="datasheet-editable" >
                        <div className="">Date Started</div>
                        <div className="div">
                            <input name="date_started" onChange={this.onUpdateRole} type="date" value={date_started} className="plain-input" />
                        </div>
                    </div>

                    {/* Date Left */}
                    <div className="datasheet-editable" >
                        <div className="">Date Left</div>
                        <div className="div">
                            <input type="date"  name="date_left" onChange={this.onUpdateRole} value={date_left} className="plain-input" />
                        </div>
                    </div>


                    {/* Last Update */}
                    <div className="datasheet-editable" style={{opacity:0.5}} >
                        <div className="">Last Updated</div>
                        <div className="div">
                            <input type="text" disabled value={"12/05/2023"} className="plain-input" />
                        </div>
                    </div>
                    <div className=""></div>

                    
                    <div className="">
                        <Button type="warn" title="Cancel" icon="fa-solid fa-xmark" onClick={this.toogle}/>
                        <span style={{marginLeft: 10}}></span>
                        <Button onClick={this.updateRecord} type="primary" title="Update" icon="fa-solid fa-pen" hint="Update Record"/>
                    </div>

                    
                </div>
            )
        }

        return (
            <div className="data-entry" hint="Click To Expand" onClick={this.toogle} title={`Click to expand ${this.state.data.full_name} (${this.state.data.roles.length > 0 ? this.state.data.roles[0].title + " at " + this.state.data.roles[0].company: ""})`}>
                <div style={{marginLeft:5}}><img src={this.state.data.profile_picture} alt="" className="small-circlular-image" /></div>
                <div className="" >{this.state.data.full_name}</div>
                <div className="">{this.state.data.employee_id}</div>
                <div className="">{this.state.data.department}</div>
                <div className="">{this.state.data.roles.length > 0 ? this.state.data.roles[0].title : "Not Found"}</div>
                <div className="">{new Date(this.state.data.last_updated).toDateString()}</div>
            </div>
        )
    }
}
export default DirectoryDataSheetItem