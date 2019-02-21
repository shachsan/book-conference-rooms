import React, {Component} from 'react';
import Schedule from './Schedule';
import BookingForm from '../components/BookingForm';
import { CircularProgress } from '@material-ui/core';

export default class LectureRoom extends Component {

    state={
        toggleBooking:false,
    }


    onScheduleClickHandler=() => {
        this.setState({
            toggleBooking:!this.state.toggleBooking
        })
    }
    
    render(){
        return (
            <div className='lecture-room'> 
                <span className="room-title">{this.props.lectureRoom.name}</span>
                
                <ul>
                    {this.props.lectureRoom.lecture_schedules.map(schedule=>
                        <Schedule key={schedule.id} schedule={schedule}
                            renderMod={this.props.renderMod}
                            selectedDate={this.props.selectedDate}
                            onDeleteHandler={this.props.onDeleteHandler}
                            onEditHandler={this.props.onEditHandler}
                            onChangeBookForm={this.props.onChangeBookForm}
                            selectedMod={this.props.selectedMod}
                            lectureRoom={this.props.lectureRoom}
                            bookForm={this.props.bookForm}
                            onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                            allMods={this.props.allMods}
                            onEditClickHandler={this.props.onEditClickHandler}
                        />
                        )}
                </ul>
                <button className="reserve-button" onClick={()=>this.onScheduleClickHandler()}>
                    Reserve {this.props.lectureRoom.name} 
                   
                    </button>
                {this.state.toggleBooking
                ? <BookingForm onBookItHandler={this.props.onBookItHandler}
                               lectureRoom={this.props.lectureRoom}
                               roomSchedules={this.props.lectureRoom.lecture_schedules}
                               onChangeBookForm={this.props.onChangeBookForm}
                               toggleBooking={this.onScheduleClickHandler}
                               toggleStateBooking={this.state.toggleBooking}
                               bookForm={this.props.bookForm}
                               event={this.props.event}
                               selectedDate={this.props.selectedDate}
                               selectedMod={this.props.selectedMod}
                               onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                               allMods={this.props.allMods}
                               schedules={this.props.schedules}
                               />
                :null
                }
            </div>
        );
    }
};
 