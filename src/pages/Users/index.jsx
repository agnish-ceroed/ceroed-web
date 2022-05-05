import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';

import { listUsers } from '../../redux/actions';

import UserTable from './UserTable';
import UserHeader from './UserHeader';
import AddUserDrawer from './AddUserDrawer'
import DashboardLayout from '../../layouts/DashboardLayout'

import useStyles from './styles'

const savedPage = { // To be used from the api response
    pageNumber: 1,
};
const DEFAULT_ITEMS_PER_PAGE = 20;

const Users = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const userList = useSelector(state => state.users.userList.data)

    const [isOpenAddUser, setOpenAddUser] = useState(false)
    const [editUser, setEditUser] = useState(null)

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    const onLoadMore = (pageSize = DEFAULT_ITEMS_PER_PAGE, pageNumber) => {
        const filter = {
            emissionFilter: {},
            page: {
                pageSize,
                pageNumber: pageNumber || (savedPage.pageNumber || 0) + 1,
            }
        };
        // api call with filter
    };

    const handleDrawerClose = () => {
        setOpenAddUser(false)
        setEditUser(null)
    }

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <UserHeader onAddData={() => setOpenAddUser(true)} />
                <UserTable userList={userList} onLoadMore={onLoadMore} onClickEdit={(user) => setEditUser(user)} />
                {(isOpenAddUser || editUser) && <AddUserDrawer isOpen={(isOpenAddUser || editUser)} onClose={handleDrawerClose} editUser={editUser} />}
            </Container>
        </DashboardLayout>
    )
}

export default Users
