import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FlagOutlined from '@mui/icons-material/FlagOutlined';
import AssessmentOutlined from '@mui/icons-material/AssessmentOutlined';
import ViewColumnOutlinedIcon from '@mui/icons-material/ViewColumnOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FactoryIcon from '@mui/icons-material/Factory';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

export const rolesEnum = {
    ADMIN: 'admin',
    AUDITOR: 'auditor',
    SUSTAINABILITY_MANAGER: 'sustainability_manager',
    APPROVER: 'approver',
    FACILITY_MANAGER: 'facility_manager',
    BUSINESS_USER: 'business_user',
}

const allUser = [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.AUDITOR, rolesEnum.APPROVER, rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER]

export const sideMenuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardOutlinedIcon />,
    path: '/dashboard',
    roles: [
      rolesEnum.ADMIN,
      rolesEnum.APPROVER,
      rolesEnum.AUDITOR,
      rolesEnum.FACILITY_MANAGER,
      rolesEnum.BUSINESS_USER,
      rolesEnum.SUSTAINABILITY_MANAGER
    ]
  },
  {
    text: 'Topics',
    icon: <MoreHorizIcon />,
    path: '/emissions',
    roles: [
      rolesEnum.APPROVER,
      rolesEnum.FACILITY_MANAGER,
      rolesEnum.BUSINESS_USER,
      rolesEnum.SUSTAINABILITY_MANAGER
    ]
  },
  {
    text: 'Simulations',
    icon: <MailOutlineIcon />,
    path: '/simulations',
    roles: []
  },
  {
    text: 'Goals',
    icon: <FlagOutlined />,
    path: '/goals',
    roles: [
      rolesEnum.ADMIN,
      rolesEnum.SUSTAINABILITY_MANAGER,
      rolesEnum.APPROVER,
      rolesEnum.FACILITY_MANAGER,
      rolesEnum.BUSINESS_USER
    ]
  },
  {
    text: 'Reports',
    icon: <AssessmentOutlined />,
    path: '/reports',
    roles: [rolesEnum.SUSTAINABILITY_MANAGER, rolesEnum.APPROVER]
  },
  {
    text: 'Benchmarking',
    icon: <ViewColumnOutlinedIcon />,
    path: '/benchmarking',
    roles: []
  },
  {
    text: 'Facilities',
    icon: <FactoryIcon/>,
    path: '/facilities',
    roles: [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER]
  },
  {
    text: 'User Management',
    icon: <PeopleAltIcon />,
    path: '/users',
    roles: [rolesEnum.ADMIN]
  },
  {
    text: 'Companies',
    icon: <ApartmentIcon />,
    path: '/companies',
    roles: [rolesEnum.AUDITOR]
  },
  {
    text: 'Approval status',
    icon: <ViewColumnOutlinedIcon />,
    path: '/approval-status',
    roles: [
      rolesEnum.ADMIN,
      rolesEnum.SUSTAINABILITY_MANAGER,
      rolesEnum.APPROVER,
      rolesEnum.FACILITY_MANAGER,
      rolesEnum.BUSINESS_USER
    ]
  },
  {
    text: 'Audit status',
    icon: <ViewColumnOutlinedIcon />,
    path: '/audit-status',
    roles: [rolesEnum.SUSTAINABILITY_MANAGER]
  },
  {
    text: 'Tickets',
    icon: <ConfirmationNumberOutlined />,
    path: '/tickets',
    roles: allUser
  },
  {
    text: 'Assesment Cycles',
    icon: <EventNoteOutlinedIcon />,
    path: '/assesment-cycles',
    roles: [rolesEnum.ADMIN, rolesEnum.SUSTAINABILITY_MANAGER]
  }
];

export const settingsOption = [
    {
        text: 'My Profile',
        icon: <ManageAccountsOutlinedIcon/>,
        path: '/profile',
        roles: allUser
    },
    {
        text: 'Help',
        icon: <ViewColumnOutlinedIcon/>,
        path: '/help',
        roles: allUser
    },
    {
        text: 'Settings',
        icon: <ManageAccountsOutlinedIcon/>,
        path: '/settings',
        roles: allUser
    },
]