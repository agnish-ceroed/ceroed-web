import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import SideMenu from '../../components/SideMenu'
import { listFacilities } from '../../redux/actions';
import { settingsOption, sideMenuItems } from './pages';
import useStyles from "./styles";

const DashboardLayout = ({children}) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        dispatch(listFacilities());
    }, [dispatch]);

    return <Box className={classes.dasboardContainer}>
        <SideMenu
            options={sideMenuItems.filter(item => item.roles.indexOf(role) > -1)}
            secondaryOptions={settingsOption.filter(item => item.roles.indexOf(role) > -1)}
        />
        <Box className={classes.rightContainer}>
            <Header/>
            <Box className={classes.childContainer}>{children}</Box>
        </Box>
    </Box>
};

export default DashboardLayout;

DashboardLayout.propTypes = {
    children: PropTypes.any
};