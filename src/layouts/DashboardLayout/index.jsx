import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'

//components
import Header from '../../components/Header'
import SideMenu from '../../components/SideMenu'
import { settingsOption, sideMenuItems } from './pages';
import useStyles from "./styles";

const DashboardLayout = ({children}) => {
    
    const classes = useStyles();
    const role = useSelector((state) => state.auth.role);

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