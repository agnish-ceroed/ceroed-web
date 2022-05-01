import { Box } from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import PropTypes from 'prop-types';

//components
import Header from '../../components/Header'
import SideMenu from '../../components/SideMenu'
import useStyles from "./styles";

const DashboardLayout = ({children}) => {
    
    const classes = useStyles();
    
    const sideMenuItems = [
        {
            text: 'Dashboard',
            icon: <DashboardOutlinedIcon/>,
            path: '/dashboard'
        },
        {
            text: 'Emissions',
            icon: <MoreHorizIcon/>,
            path: '/emissions'
        },
        {
            text: 'Simulations',
            icon: <MailOutlineIcon/>,
            path: '/simulations'
        },
        {
            text: 'Goals',
            icon: <PersonOutlineIcon/>,
            path: '/goals'
        },
        {
            text: 'Reports',
            icon: <ChatBubbleOutlineOutlinedIcon/>,
            path: '/reports'
        },
        {
            text: 'Benchmarking',
            icon: <ViewColumnOutlinedIcon/>,
            path: '/benchmarking'
        },
        {
            text: 'Facilities',
            icon: <CategoryIcon/>,
            path: '/facilities'
        },
        {
            text: 'User Management',
            icon: <PeopleAltIcon/>,
            path: '/users'
        },
        {
            text: 'Approval status',
            icon: <ViewColumnOutlinedIcon/>,
            path: '/approval-status'
        },
        {
            text: 'Audit status',
            icon: <ViewColumnOutlinedIcon/>,
            path: '/audit-status'
        },
    ]

    const settingsOption = [
        {
            text: 'My Profile',
            icon: <ManageAccountsOutlinedIcon/>,
            path: '/profile'
        },
        {
            text: 'Help',
            icon: <ViewColumnOutlinedIcon/>,
            path: '/help'
        },
        {
            text: 'Settings',
            icon: <ManageAccountsOutlinedIcon/>,
            path: '/settings'
        },
    ]

    return <Box className={classes.dasboardContainer}>
        <SideMenu options={sideMenuItems} secondaryOptions={settingsOption}/>
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