import PropTypes from 'prop-types';
import { Avatar, Drawer, Typography } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from '@mui/system';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import CeroEdLogo from '../../assets/images/Logo';
import useStyles from "./styles";
import { userRoles } from '../../constants';

const SideMenu = ({options, secondaryOptions}) => {
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    const userInfo = useSelector(state => state.auth.userInfo);
    const userRole = userRoles.find(role => role.key === userInfo?.role);

    return <Box className={classes.drawerConainer}>
        <Drawer 
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper: classes.drawerCanvas}}
            >
            <Box className={classes.title}>
                <Box className={classes.titleText}><CeroEdLogo /></Box>
            </Box>
            <Box className={classes.userContainer}>
                <Box className={classes.avatarContainer}>
                    <Avatar alt={userInfo.name} src={userInfo.logo} children={userInfo.name.charAt(0).toUpperCase()} className={classes.avatar} />
                </Box>
                <Box className={classes.userInfoContainer}>
                    <Typography variant="subtitle2" component="div" >{userInfo.name}</Typography>
                    <Typography variant="caption" >{userInfo.email}</Typography>
                    <Typography variant="caption" >{userRole?.value}</Typography>
                </Box>
            </Box>
            <List>
                {options.map(menuItem => <ListItem 
                    key={menuItem.text} 
                    button 
                    onClick={() => navigate(menuItem.path)}>
                        <ListItemIcon className={location.pathname.includes(menuItem.path) ? classes.activeOption : classes.icon}>{menuItem.icon}</ListItemIcon>
                        <ListItemText primary={menuItem.text} className={location.pathname.includes(menuItem.path) ? classes.activeOption : classes.menuText}/>
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