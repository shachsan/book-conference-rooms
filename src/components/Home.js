import React from "react";
import SchedulePageContainer from '../containers/SchedulePageContainer';
import dateFns from "date-fns";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "../App.css";

class Home extends React.Component {
      state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        selectedMod:'',
        allMods:[],
        modSelected:'',
        lecSchedules:[],
        sort:'',
        schedules:[],
        newScheduleId:'',
        bookForm:{
          start_time:'',
          end_time:'',
          event:''
        }

    };

    onEditClickHandler=(event)=>{
        this.setState({bookForm:{event:event}})
    }

    nextMonth = () => {
      this.setState({
        currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
      });
    };
    prevMonth = () => {
      this.setState({
        currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
      });
    };

    onDateClick = day => {
      this.setState({
        selectedDate: day
      });
    };

    convertToTime=(min) => {
        if(!min.includes(':')){
            let hours, minutes;
            hours = Math.floor(min / 60);
            minutes = min % 60;
            if (minutes < 10){
                minutes = '0' + minutes; // adding leading zero
            }
           
            if (hours < 10)
                hours='0'+ hours

            return hours+':'+minutes
        }else{
            return min
        }
    }

    getModName=(modId) => {
        const mod=this.state.allMods.filter(mod=>mod.id===modId)
        return mod[0].name;
    }

    modClickHandler=(e, mod) => {
        this.setState({
            modSelected: mod,
        })
    }

    
    onChangeSortHandler=async(e) => {
        await this.setState({
            sort:e.target.value
        })

        this.sortSchedules(this.state.sort);
    }

    //sort function
    sortSchedules=(type) => {
        if (type==='time'){
            const newSchedule = [...this.state.schedules]
            newSchedule.forEach(lectureRoom=>{
                  lectureRoom.lecture_schedules.sort((s1, s2)=>{
                            if (s1.start_time > s2.start_time)
                                return 1
                            else if (s1.start_time < s2.start_time)
                                return -1
                    })
            })

            this.setState({
                schedules:newSchedule
            })
        }else if(type==='mod'){
            const newSchedule = [...this.state.schedules]
            newSchedule.forEach(lectureRoom=>{
                  lectureRoom.lecture_schedules.sort((s1, s2)=>{
                        s1.modName=this.getModName(s1.mod_id)
                        s2.modName=this.getModName(s2.mod_id)
                            if (s1.modName > s2.modName)
                                return 1
                            else if (s1.modName < s2.modName)
                                return -1
                    })
            })

            this.setState({
                schedules:newSchedule
            })
        }

    }

    renderMod=(e) => {
        this.setState({modClick:e.target.id})
    }

    //Handle when mod selected during lecture room suggestion
    onChangeModSelectionHandler=(e) => {
         this.setState({
            selectedMod:e.target.value,
        })
    }

    onChangeBookForm=(e) => {
      const newBookForm={...this.state.bookForm}
      newBookForm[e.target.name]=e.target.value
        if(e.target.name==='start_time'){
            if(e.target.value==='From')
                newBookForm.start_time=undefined
            else
                newBookForm.start_time=this.convertToTime(newBookForm.start_time)

        }else if(e.target.name==='end_time'){
            if(e.target.value==='To')
                newBookForm.end_time=undefined
            else
                newBookForm.end_time=this.convertToTime(newBookForm.end_time)
        }
      
      this.setState({
        bookForm:newBookForm
      })
    }

    //Edit schedule
    onEditHandler=(e,schedule) => {
        e.preventDefault();
        let updateSch;
        const id=schedule.id;

        const newBookForm={...this.state.bookForm}
        newBookForm.start_time=dateFns.format(this.state.selectedDate, 'YYYY-MM-DD')+'T'+newBookForm.start_time+'Z'
        newBookForm.end_time=dateFns.format(this.state.selectedDate, 'YYYY-MM-DD')+'T'+newBookForm.end_time+'Z'
        
        
        let newSchedule=[...this.state.schedules]
        newSchedule.forEach(lectureRoom=>{
          if(lectureRoom.id===schedule.lecture_room_id){
            lectureRoom.lecture_schedules.forEach(sch=>{
                if(sch.id===schedule.id){
                    sch.start_time=newBookForm.start_time
                    sch.end_time=newBookForm.end_time
                    sch.event=newBookForm.event
                    updateSch={
                        start_time:newBookForm.start_time,
                        end_time:newBookForm.end_time,
                        event:newBookForm.event,
                    }
                }
            })
          }

        })

        this.setState({
            bookForm:{
                start_time:'',
                end_time:'',
                event:''},
        })

        fetch(`https://book-conference-room.herokuapp.com/api/v1/lecture_schedules/${id}`,{
            method: 'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(updateSch)
        })
    }

    //Delete schedule Handler
    onDeleteHandler=(schedule) => {
        const id=schedule.id
        let newSchedule=[...this.state.schedules];
            newSchedule.forEach(room=>{
                if(room.id===schedule.lecture_room_id){
                    room.lecture_schedules.forEach(sch=>{
                        if(sch.id===schedule.id){
                            let i=room.lecture_schedules.indexOf(sch);
                            room.lecture_schedules.splice(i,1)
                        }
                    })
                }
            })

        this.setState({
            schedules:newSchedule
        })

        fetch(`https://book-conference-room.herokuapp.com/api/v1/lecture_schedules/${id}`,{
          method:'DELETE'
        })
    }
    
    onSubmitFormHandler=(e, roomId) => {
      e.preventDefault();    
        //setting new schedule for fetch post
        const reservation={
            event:this.state.bookForm.event,
            date:this.state.selectedDate,
            start_time:this.state.bookForm.start_time,
            end_time:this.state.bookForm.end_time,
            mod_id:this.state.selectedMod,
            lecture_room_id:roomId,
        }
        //fetch post to lecture_schedules
                                                
        fetch('https://book-conference-room.herokuapp.com/api/v1/lecture_schedules',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(reservation)
        }).then(res=>res.json())
            .then(justAddedSch=>{
                let newSchedule=[...this.state.schedules]
                const lecRoom=newSchedule.find(room=>room.id===roomId)
                lecRoom.lecture_schedules=[...lecRoom.lecture_schedules, justAddedSch]
                this.setState({
                    schedules:newSchedule,
                    bookForm:{
                        start_time:'',
                        end_time:'',
                        event:''},
            })
        })
    }

    componentDidMount(){
        fetch('https://book-conference-room.herokuapp.com/api/v1/lecture_rooms')
            .then(res=>res.json())
            .then(schedules=>this.setState({schedules}))

        fetch('https://book-conference-room.herokuapp.com/api/v1/mods')
            .then(res=>res.json())
            .then(mods=>this.setState({allMods:mods}))

        fetch('https://book-conference-room.herokuapp.com/api/v1/lecture_schedules')
        .then(res=>res.json())
        .then(lecSchedules=>this.setState({lecSchedules}))
    }


  render() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path='/' render={(props)=>(
                        <header>
                            <div id="logo">
                                <span>
                                Manage <b>School</b>
                                </span><br/>
                                <span className="icon swing">date_range</span>
                            </div>
                        </header>
                    )}/>

                    <Route exact path='/booking' render={(props)=>(
                        <header>
                            <div id="logo">
                                <span>
                                Book <b>Lecture Room</b>
                                </span><br/>
                                <span className="icon swing">date_range</span>
                            </div>
                        </header>
                    )}/>
                </Switch>
                
                <SchedulePageContainer 
                    currentMonth={this.state.currentMonth}
                    renderMod={this.renderMod}
                    modClick={this.state.modClick}
                    selectedDate={this.state.selectedDate}
                    nextMonth={this.nextMonth}
                    prevMonth={this.prevMonth}
                    onDateClick={this.onDateClick}
                    modClickHandler={this.modClickHandler}
                    schedules={this.state.schedules}
                    onBookItHandler={this.onSubmitFormHandler}
                    onChangeBookForm={this.onChangeBookForm}
                    event={this.state.bookForm.event}
                    bookForm={this.state.bookForm}
                    onDeleteHandler={this.onDeleteHandler}
                    onEditHandler={this.onEditHandler}
                    selectedMod={this.state.selectedMod}
                    onChangeModSelectionHandler={this.onChangeModSelectionHandler}
                    allMods={this.state.allMods}
                    onChangeSortHandler={this.onChangeSortHandler}
                    modSelected={this.state.modSelected}
                    lecSchedules={this.state.lecSchedules}
                    onEditClickHandler={this.onEditClickHandler}
                />
                
                
            </div>
      </Router>
    );
  }
}

export default Home;