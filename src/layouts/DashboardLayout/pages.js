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
    AUDITOR: 'auditor',
    SUSTAINABILITY_MANAGER: 'sustainability_manager',
    APPROVER: 'approver',
    FACILITY_MANAGER: 'facility_manager',
    BUSINESS_USER: 'business_user',
}

export const sideMenuItems = [
    {
        text: 'Dashboard',
        icon: <DashboardOutlinedIcon/>,
        path: '/dashboard',
        roles: [rolesEnum.ADMIN, rolesEnum.APPROVER, rolesEnum.AUDITOR, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.SUSTAINABILITY_MANAGER]
    },
    {
        text: 'Emissions',
        icon: <MoreHorizIcon/>,
        path: '/emissions',
        roles: [rolesEnum.APPROVER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER]
    },
    {
        text: 'Simulations',
        icon: <MailOutlineIcon/>,
        path: '/simulations',
        roles: []
    },
    {
        text: 'Goals',
        icon: <PersonOutlineIcon/>,
        path: '/goals',
        roles: [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.APPROVER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER]
    },
    {
        text: 'Reports',
        icon: <ChatBubbleOutlineOutlinedIcon/>,
        path: '/reports',
        roles: [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.APPROVER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER]
    },
    {
        text: 'Benchmarking',
        icon: <ViewColumnOutlinedIcon/>,
        path: '/benchmarking',
        roles: []
    },
    {
        text: 'Facilities',
        icon: <CategoryIcon/>,
        path: '/facilities',
        roles: [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER]
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
        roles: [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.APPROVER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER]
    },
    {
        text: 'Audit status',
        icon: <ViewColumnOutlinedIcon/>,
        path: '/audit-status',
        roles: [rolesEnum.SUSTAINABILITY_MANAGER]
    },
]

export const settingsOption = [
    {
        text: 'My Profile',
        icon: <ManageAccountsOutlinedIcon/>,
        path: '/profile',
        roles: [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.AUDITOR, rolesEnum.APPROVER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER]
    },
    {
        text: 'Help',
        icon: <ViewColumnOutlinedIcon/>,
        path: '/help',
        roles: [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.AUDITOR, rolesEnum.APPROVER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER]
    },
    {
        text: 'Settings',
        icon: <ManageAccountsOutlinedIcon/>,
        path: '/settings',
        roles: [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.AUDITOR, rolesEnum.APPROVER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER]
    },
]