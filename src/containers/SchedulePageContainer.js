import React, { Component } from 'react';
import Calendar from '../components/Calendar';
import ScheduleContainer from './ScheduleContainer';
import NavBar from '../components/NavBar';
import ModContainer from '../containers/ModContainer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


export default class SchedulePageContainer extends Component {
    render() {
        return (
            <Router>
                    <main>
                        <NavBar selectedDate={this.props.selectedDate}
                                schedules={this.props.schedules}
                                modClick={this.props.modClick}
                                
                                />

                        <Switch>
                            <Route exact path='/' render={(props)=>(
                                <ModContainer modClick={this.props.modClick} allMods={this.props.allMods}
                                    modClickHandler={this.props.modClickHandler}
                                    modSelected={this.props.modSelected}  lecSchedules={this.props.lecSchedules}/>
                                
                                )}/>
                        </Switch>
                        
                        <Switch>
                            <Route exact path='/booking' render={(props)=>(
                                <React.Fragment>
                                    <Calendar 
                                        currentMonth={this.props.currentMonth}
                                        selectedDate={this.props.selectedDate}
                                        nextMonth={this.props.nextMonth}
                                        prevMonth={this.props.prevMonth}
                                        onDateClick={this.props.onDateClick}
                                        />

                                    <ScheduleContainer schedules={this.props.schedules} 
                                        selectedDate={this.props.selectedDate}
                                        bookForm={this.props.bookForm}
                                        onBookItHandler={this.props.onBookItHandler}
                                        onChangeBookForm={this.props.onChangeBookForm}
                                        event={this.props.event} onDeleteHandler={this.props.onDeleteHandler}
                                        onEditHandler={this.props.onEditHandler}
                                        selectedMod={this.props.selectedMod}
                                        onChangeModSelectionHandler={this.props.onChangeModSelectionHandler}
                                        allMods={this.props.allMods}
                                        renderMod={this.props.renderMod}
                                        onChangeSortHandler={this.props.onChangeSortHandler}
                                        onEditClickHandler={this.props.onEditClickHandler}
                                        
                                    />
                                </React.Fragment>
                            )}/>
                            
                        </Switch>
                    </main>
            </Router>
        );
    }
};
