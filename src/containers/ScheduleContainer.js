import React, { Component } from 'react';
import LectureRoom from '../components/LectureRoom';
import dateFns from 'date-fns';

export default class ScheduleContainer extends Component {
    
    render() {
        return (
             <div className="schedule">
                <h4 className="schedule-header">{dateFns.format(this.props.selectedDate, 'dddd DD')}</h4>
                <div className="sort-menu-bar"> Sort By  
                        <select onChange={(e)=>this.props.onChangeSortHandler(e)}>
                            <option>Sort type</option>
                            <option value='time'>Schedule Time</option>
                            <option value='mod'>Mod</option>
                        </select>
                </div>
                    {this.props.schedules.map(lectureRoom=>
                    <LectureRoom key={lectureRoom.id} lectureRoom={lectureRoom}
                        selectedDate={this.props.selectedDate}
                        renderMod={this.props.renderMod}
                        bookForm={this.props.bookForm}
                        onBookItHandler={this.props.onBookItHandler}
                        onChangeBookForm={this.props.onChangeBookForm}
                        event={this.props.event} onDeleteHandler={this.props.onDeleteHandler}
                        onEditHandler={this.props.onEditHandler}
                        selectedMod={this.props.selectedMod}
                        onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                        allMods={this.props.allMods}
                        schedules={this.props.schedules}
                        onEditClickHandler={this.props.onEditClickHandler}
                    />)}

                    
             </div>
        );
    }
};
