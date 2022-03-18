import React, { useState } from 'react';

import CeroButton from '../../../components/CeroButton';
import CeroTable from '../../../components/CeroTable';
import UserDeletePrompt from '../UserDeletePrompt';
import useStyles from "./styles";

const UserTable = (props) => {
    const classes = useStyles();

    const [openDeletePrompt, setOpenDeletePrompt] = useState(false)
    const [deleteUser, setDeleteUser] = useState()

    const tableColumns = [{
        columnKey: 'email',
        columnId: 'email',
        columnHeader: 'Email',
    }, {
        columnKey: 'action',
        columnId: 'action',
        columnHeader: '',
        align: 'right'
    }]

    const handleDelete = (user) => {
        setOpenDeletePrompt(true)
        setDeleteUser(user)
    }

    const getUserData = () => props.userList.map((user) => ({
        ...user,
        action: (
            <>
                <CeroButton className={classes.button} buttonText='Edit' onClick={() => props.onClickEdit(user.id)} />
                <CeroButton className={classes.button} buttonText='Delete' onClick={() => handleDelete(user.id)} />
            </>
        ),
    }));


    return (
        <>
            <CeroTable
                columns={tableColumns}
                data={getUserData()}
                hasMore={false}
                loading={false}
                loadMore={props.onLoadMore}
            />
            <UserDeletePrompt userId={deleteUser} isOpen={openDeletePrompt} setOpenDeletePrompt={setOpenDeletePrompt} />
        </>
    )
}

export default UserTable;
