import React, { Component } from 'react';
import dateFns from "date-fns";
import UpdateForm from './updateForm';



export default class Schedule extends Component {
    state={
        toggleEdit:false
    }

    toggleEditHandler=(event) => {
        this.setState({
            toggleEdit:!this.state.toggleEdit
        })
        // this.props.onEditClickHandler(event)
    }

    getModName=(modId) => {

        return `Mod ${modId}`
    }

    getClassName=(modId) => {
        return `mod mod-${modId}`
    }

    formatTime=(time) => {
        const convertUTC=time.slice(0,time.length-1);
        const localDateTime=new Date(convertUTC+'-05:00');//concating -5:00 to convertUTC string
        const localTime=dateFns.format(localDateTime, 'hh:mm a')
        return localTime;
    }
    render() {
                 
        return (
            <React.Fragment>
                 {dateFns.format(this.props.schedule.date, 'YYYY-MM-DD')===dateFns.format(this.props.selectedDate, 'YYYY-MM-DD')
                 
                 ? <li className="reservation"> {this.formatTime(this.props.schedule.start_time)} - 
                        {this.formatTime(this.props.schedule.end_time)} ---  
                        {this.props.schedule.event} 
                        <span onClick={(e)=>this.props.renderMod(e)} id={this.props.schedule.mod_id} className={this.getClassName(this.props.schedule.mod_id)}>
                        {this.getModName(this.props.schedule.mod_id)}
                        </span><br/>
                        
                        {this.state.toggleEdit
                            ? <UpdateForm
                                onEditHandler={this.props.onEditHandler}
                                onChangeBookForm={this.props.onChangeBookForm}
                                schedule={this.props.schedule}
                                toggleEditHandler={this.toggleEditHandler}
                                selectedMod={this.props.selectedMod}
                                selectedDate={this.props.selectedDate}
                                lectureRoom={this.props.lectureRoom}
                                bookForm={this.props.bookForm}
                                onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                                allMods={this.props.allMods}

                                />
                            : null
                        }
                        <button className="btn-edit" onClick={()=>{this.toggleEditHandler();this.props.onEditClickHandler(this.props.schedule.event)}}>Edit Schedule</button>
                        
                        <button className="btn-del" onClick={(e)=>this.props.onDeleteHandler(this.props.schedule)}>Delete</button>
                    </li>
                :null
                }
             </React.Fragment>
        );
    }
};
