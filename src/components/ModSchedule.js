import React from 'react';
import dateFns from "date-fns";

const formatTime=(time) => {
    const convertUTC=time.slice(0,time.length-1);
    const localDateTime=new Date(convertUTC+'-05:00');//concating -5:00 to convertUTC string
    const localTime=dateFns.format(localDateTime, 'hh:mm a')
    return localTime;
}

const getRoomName=(id)=>{
    return id==1 ? 'Borg' : 'Turing'
}

const getClassName=(id) => {
    return id ==1 ? 'borg' : 'turing'
}

const ModSchedule = (props) => {
    return ( 
        <div>
            <h2 className='mod-sch-header'>{props.modSelected.name}  {props.modSelected.nick_name}</h2>
            <ul>
            {props.lecSchedules.filter(schedule=>schedule.mod_id===props.modSelected.id)
                .map(sch=><li className="reservation" key={sch.id}>
                        <h4 className="mod-sch-date">{sch.date}</h4> <br/>
                            {sch.event} --
                            {formatTime(sch.start_time)} - {formatTime(sch.end_time)}
                            <span className={getClassName(sch.lecture_room_id)}>{getRoomName(sch.lecture_room_id)}</span>

                        </li>
            )}
            </ul>
        </div>
     );
}
 
export default ModSchedule;