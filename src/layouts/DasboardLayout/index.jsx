import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import PropTypes from 'prop-types';

//components
import Header from '../../components/Header'
import SideMenu from '../../components/SideMenu'
import useStyles from "./styles";
import { Box } from '@mui/material';

const DasboardLayout = ({children}) => {
    
    const classes = useStyles();
    
    const sideMenuItems = [
        {
            text: 'Dashboard',
            icon: <DashboardOutlinedIcon/>,
            path: '/dashboard'
        },
        {
            text: 'Tasks',
            icon: <SplitscreenIcon/>,
            path: '/tasks'
        },
        {
            text: 'Email',
            icon: <MailOutlineIcon/>,
            path: '/email'
        },
        {
            text: 'Contacts',
            icon: <PersonOutlineIcon/>,
            path: '/contacts'
        },
        {
            text: 'Chat',
            icon: <ChatBubbleOutlineOutlinedIcon/>,
            path: '/chat'
        },
        {
            text: 'Deals',
            icon: <ViewColumnOutlinedIcon/>,
            path: '/deals'
        }
    ]

    const settingsOption = [
        {
            text: 'Settings',
            icon: <MoreHorizIcon/>,
            path: '/settings'
        }]

    return <Box className={classes.dasboardContainer}>
        <SideMenu options={sideMenuItems} secondaryOptions={settingsOption}/>
        <Box className={classes.rightContainer}>
            <Header/>
            <Box className={classes.childContainer}>{children}</Box>
        </Box>
    </Box>
};

export default DasboardLayout;

DasboardLayout.propTypes = {
    children: PropTypes.any
};