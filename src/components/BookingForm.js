import React, {Component} from 'react';
import dateFns from "date-fns";


class BookingForm extends Component{

    state={
        fromTime:360,
        toTime:360,
    }


    checkInputs=() => {
        if(this.props.bookForm.start_time!==undefined && this.props.bookForm.end_time!==undefined && this.props.bookForm.event!=='' && this.props.selectedMod!=='')
            return null;
        else 
            return 'disabled';
    }

    ifBooked=(min) => {
        let timeBook=[];
        const bookedHours=this.props.roomSchedules.filter(sch=>{
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

    //check if same mod is scheduled  for same time in different rooms
    checkModSchedule=(modId) => {
        let schedulesOnOtherRooms=[];
        this.props.schedules.forEach(room=>{
            if(room.id!==this.props.roomSchedules[0].lecture_room_id){
                room.lecture_schedules.forEach(sch=>{
                    if ((dateFns.format(sch.date, 'YYYY-MM-DD')===dateFns.format(this.props.selectedDate, 'YYYY-MM-DD')) && (sch.mod_id===modId)){     
                        schedulesOnOtherRooms.push(sch)
                    }
                })
            }
        })

        for(let sch of schedulesOnOtherRooms){
            let bookedStartTime = ((dateFns.getHours(sch.start_time)+5)*60)+(dateFns.getMinutes(sch.start_time));
            if(bookedStartTime==this.state.fromTime){
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
            
            <form onSubmit={(e)=>{this.props.onBookItHandler(e, this.props.lectureRoom.id);
                            this.props.toggleBooking();}}>
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
                </select><hr/>

                <label>Event Name</label>
                <input style={{display:'inline-block', width:'60%'}} type='text' name='event' placeholder='enter event name' value={this.props.event}
                    onChange={(e)=>this.props.onChangeBookForm(e)}></input><br/>
                
                <label>Mod Group</label>
                <select onChange={(e)=>{this.props.onChangeModSelectionHandler(e)}}>
                    <option>Choose Mod</option>
                    {this.props.allMods.map(mod=>
                        <option key={mod.id} value={mod.id} disabled={this.checkModSchedule(mod.id)}>{mod.name}</option>)}
                </select><br/>

                <input type='submit' value='Book It!' disabled={this.checkInputs()}/>
            </form>
        );
    }
}
 
export default BookingForm;