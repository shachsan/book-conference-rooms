import React, { Component } from 'react';
import ModCard from '../components/ModCard';
import ModSideContainer from './ModSideContainer';

export default class ModContainer extends Component {

    getModName=(modId) => {
        return `Mod ${modId}`
    }

    render() {
        return (
            <React.Fragment>
                <div className="show-mod">
                    {this.props.allMods.map(mod=>
                        <ModCard key={mod.id} mod={mod} 
                            modClickHandler={this.props.modClickHandler}

                        />)}
                </div>
                <ModSideContainer modSelected={this.props.modSelected}
                     lecSchedules={this.props.lecSchedules}/>
            </React.Fragment>
        );
    }
};
