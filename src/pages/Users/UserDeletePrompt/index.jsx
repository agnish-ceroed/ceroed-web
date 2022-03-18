import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Typography } from "@mui/material"

import { STATUS } from "../../../redux/constants"
import { deleteUser, listUsers, resetUserStatus } from "../../../redux/actions"
import CeroSideSheetDrawer from "../../../components/CeroSideSheetDrawer"
import useStyles from './styles'

const UserDeletePrompt = (props) => {
    const { setOpenDeletePrompt } = props
    const classes = useStyles()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    
    const deleteStatus = useSelector(state => state.users.deleteUser)

    useEffect(() => {
        if (deleteStatus.status === STATUS.SUCCESS) {
            enqueueSnackbar('User deleted successfully', { variant: 'success' });
            setOpenDeletePrompt(false)
            dispatch(resetUserStatus())
            dispatch(listUsers())
        } else if (deleteStatus.status === STATUS.ERROR) {
            enqueueSnackbar('User delete failed', { variant: 'error' });
        }
    }, [deleteStatus, dispatch, enqueueSnackbar, setOpenDeletePrompt])

    const handleDeleteFacility = () => {
        dispatch(deleteUser(props.userId))
    }

    const getPrimaryConfirmDrawer = () => {
        return (
            <Box className={classes.mainContainer}>
                <Typography >Are you sure you want to delete user?</Typography>
            </Box>
        )
    };

    return (
        <CeroSideSheetDrawer
            primaryDrawer={{
                drawerOpen: props.isOpen,
                onClose: () => setOpenDeletePrompt(false),
                content: getPrimaryConfirmDrawer(),
                header: { title: "Confirm!" },
                classes: {
                    drawerContainer: classes.drawerContainer,
                    contentArea: classes.drawerContentArea,
                },
                footer: {
                    primaryBtnTitle: 'Confirm',
                    secondaryBtnTitle: 'Cancel',
                    hideSecondaryBtn: false,
                    primaryBtnAction: handleDeleteFacility,
                    secondaryBtnAction: () => setOpenDeletePrompt(false),
                },
            }}
        />
    )
}
export default UserDeletePrompt
