import React from 'react';
import ModSchedule from '../components/ModSchedule';

const ModSideContainer = (props) => {
    return ( 
        <div className="mod-side-container">
                <ModSchedule modSelected={props.modSelected}
                lecSchedules={props.lecSchedules}/>
            

        </div>
    );
}
 
export default ModSideContainer;
