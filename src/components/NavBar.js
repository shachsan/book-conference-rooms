import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    
    appbar: {
        textAlign:'right',
  },

};

const NavBar=(props)=>{
    
        return (

            <AppBar position='relative'>
                <Toolbar variant='dense'>
                 
                    <Link className="nav-mods" to='/'>
                        <Typography color='inherit' variant='inherit'>
                            <span>All Mods</span>
                        </Typography>
                    </Link>

                    <Link className="nav-mods" to='/booking'>
                        <Typography color='inherit' variant='inherit'>
                            <span>Book Lecture Room</span>
                        </Typography>
                    </Link>

                </Toolbar>
            </AppBar>
        );
}

export default  withStyles(styles)(NavBar);