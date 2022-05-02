import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import ApartmentIcon from '@mui/icons-material/Apartment';


export const rolesEnum = {
    ADMIN: 'admin',
    AUDITOR: 'auditor'
}

export const sideMenuItems = [
    {
        text: 'Dashboard',
        icon: <DashboardOutlinedIcon/>,
        path: '/dashboard',
        roles: [rolesEnum.ADMIN, rolesEnum.AUDITOR]
    },
    {
        text: 'Emissions',
        icon: <MoreHorizIcon/>,
        path: '/emissions',
        roles: [rolesEnum.ADMIN]
    },
    {
        text: 'Simulations',
        icon: <MailOutlineIcon/>,
        path: '/simulations',
        roles: [rolesEnum.ADMIN]
    },
    {
        text: 'Goals',
        icon: <PersonOutlineIcon/>,
        path: '/goals',
        roles: [rolesEnum.ADMIN]
    },
    {
        text: 'Reports',
        icon: <ChatBubbleOutlineOutlinedIcon/>,
        path: '/reports',
        roles: [rolesEnum.ADMIN]
    },
    {
        text: 'Benchmarking',
        icon: <ViewColumnOutlinedIcon/>,
        path: '/benchmarking',
        roles: [rolesEnum.ADMIN]
    },
    {
        text: 'Facilities',
        icon: <CategoryIcon/>,
        path: '/facilities',
        roles: [rolesEnum.ADMIN]
    },
    {
        text: 'User Management',
        icon: <PeopleAltIcon/>,
        path: '/users',
        roles: [rolesEnum.ADMIN]
    },
    {
        text: 'Companies',
        icon: <ApartmentIcon/>,
        path: '/companies',
        roles: [rolesEnum.AUDITOR]
    },
    {
        text: 'Approval status',
        icon: <ViewColumnOutlinedIcon/>,
        path: '/approval-status',
        roles: [rolesEnum.ADMIN]
    },
    {
        text: 'Audit status',
        icon: <ViewColumnOutlinedIcon/>,
        path: '/audit-status',
        roles: [rolesEnum.ADMIN]
    },
]

export const settingsOption = [
    {
        text: 'My Profile',
        icon: <ManageAccountsOutlinedIcon/>,
        path: '/profile',
        roles: [rolesEnum.AUDITOR, rolesEnum.ADMIN]
    },
    {
        text: 'Help',
        icon: <ViewColumnOutlinedIcon/>,
        path: '/help',
        roles: [rolesEnum.AUDITOR, rolesEnum.ADMIN]
    },
    {
        text: 'Settings',
        icon: <ManageAccountsOutlinedIcon/>,
        path: '/settings',
        roles: [rolesEnum.AUDITOR, rolesEnum.ADMIN]
    },
]