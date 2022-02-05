import PropTypes from 'prop-types';
import { Drawer, Typography } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from '@mui/system';

import { useLocation, useNavigate } from "react-router-dom";

import useStyles from "./styles";

const SideMenu = ({options, secondaryOptions}) => {
    const userImage = require('../../assets/userAvatar.png');
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    return <Box className={classes.drawerConainer}>
        <Drawer 
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper: classes.drawerCanvas}}
            >
            <Box className={classes.title}>
                <Box className={classes.titleText}>CeroED</Box>
            </Box>
            <Box className={classes.userContainer}>
                <Box className={classes.avatarContainer}>
                    <img alt='userImage' src={userImage} className={classes.avatar}/>
                </Box>
                <Box className={classes.userInfoContainer}>
                    <Typography variant="subtitle2" component="div" >{'Sierra Ferguson'}</Typography>
                    <Typography variant="caption" >{'s.ferguson@gmail.com'}</Typography>
                </Box>
            </Box>
            <List>
                {options.map(menuItem => <ListItem 
                    key={menuItem.text} 
                    button 
                    onClick={() => navigate(menuItem.path)}>
                        <ListItemIcon className={location.pathname === menuItem.path ? classes.activeOption : classes.icon}>{menuItem.icon}</ListItemIcon>
                        <ListItemText primary={menuItem.text} className={location.pathname === menuItem.path ? classes.activeOption : classes.menuText}/>
                </ListItem>)}
            </List>
            <Box className={classes.secodaryOptions}>
                <List>
                    {secondaryOptions.map(menuItem => <ListItem 
                        key={menuItem.text} 
                        button 
                        onClick={() => navigate(menuItem.path)}>
                            <ListItemIcon className={location.pathname === menuItem.path ? classes.activeOption : classes.icon}>{menuItem.icon}</ListItemIcon>
                            <ListItemText primary={menuItem.text} className={location.pathname === menuItem.path ? classes.activeOption : classes.menuText}/>
                    </ListItem>)}
                </List>
            </Box>
        </Drawer>
    </Box>
};

export default SideMenu;


SideMenu.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    secondaryOptions: PropTypes.arrayOf(PropTypes.object),
};

SideMenu.defaultProps = {
    options: [],
    secondaryOptions: [],
};