import React, {Component} from 'react';
import dateFns from "date-fns";


class UpdateForm extends Component{

    state={
        fromTime:360,
        toTime:360
    }

    checkInputs=() => {
        if(this.props.bookForm.start_time===undefined || this.props.bookForm.end_time===undefined){// && this.props.bookForm.event!=='')
        return 'disabled'
    }else{ 
        return null;
    }
}


ifBooked=(min) => {
    let timeBook=[];
    const bookedHours=this.props.lectureRoom.lecture_schedules.filter(sch=>{
        return dateFns.format(sch.date, 'YYYY-MM-DD')===dateFns.format(this.props.selectedDate, 'YYYY-MM-DD')
        
    })
    bookedHours.forEach(sch=>{
        let bookedStartTime = ((dateFns.getHours(sch.start_time)+5)*60)+(dateFns.getMinutes(sch.start_time));
        let bookedEndTime=((dateFns.getHours(sch.end_time)+5)*60)+(dateFns.getMinutes(sch.end_time));
        timeBook.push([bookedStartTime, bookedEndTime])
    })
    
        for(let hours of timeBook){
            if (min>=hours[0] && min <hours[1]){
                return 'disabled';
            }
        }
        
    }
    
    populateSelectBox=(min) => {
        let hours, minutes, ampm;
        hours = Math.floor(min / 60);
        minutes = min % 60;
        if (minutes < 10){
            minutes = '0' + minutes; // adding leading zero
        }
        ampm = hours % 24 < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        if (hours === 0){
            hours = 12;
        }
        
        return hours+':'+minutes+' '+ampm;
    }
    
    startTimeOptions=() => {
        const optionTemp=[];
        for(let i = 360; i <= 1320; i += 15){
            optionTemp.push(<option key={i} value={i} disabled={this.ifBooked(i)}>
            {this.populateSelectBox(i)}
        </option>);
        }
        return optionTemp;
        
    }
    
    endTimeOptions=() => {
        const optionTemp=[];
        for(let i = this.state.toTime; i <= 1320; i += 15){
            optionTemp.push(<option key={i} value={i} disabled={this.ifBooked(i)}>
            {this.populateSelectBox(i)}
        </option>);
        }
        return optionTemp;
        
    }
    
    
    render(){
        return ( 
            <form onSubmit={(e)=>{this.props.onEditHandler(e, this.props.schedule);this.props.toggleEditHandler();}}>
                <label>Start time</label>
                <select name='start_time' onClick={this.startTimeOptions} onChange={(e)=>{
                    this.props.onChangeBookForm(e);
                    this.setState({fromTime:e.target.value, toTime:Number(e.target.value)+15});}}>
                    
                    <option>From</option>
                    {this.startTimeOptions()}
                </select>

                <label>End time</label>
                <select name='end_time' onClick={this.endTimeOptions} onChange={(e)=>this.props.onChangeBookForm(e)}>
                    <option>To</option>
                    {this.endTimeOptions()}
                </select>

                <label>Event Name</label>
                <input type='text' name='event' placeholder='enter event name' value={this.props.bookForm.event}
                    onChange={(e)=>this.props.onChangeBookForm(e)}></input>
                <input type='submit' value='Update' disabled={this.checkInputs()}/>
            </form>
        );
    }
}
 
export default UpdateForm;