import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Typography } from "@mui/material"

import { deleteFacility, resetAddFacilityStatus, listFacilities } from "../../../redux/actions"
import { STATUS } from "../../../redux/constants"
import CeroSideSheetDrawer from "../../../components/CeroSideSheetDrawer"
import useStyles from './styles'

const FacilityDeletePrompt = (props) => {
    const { setOpenDeletePrompt, facility, isOpen } = props
    const classes = useStyles()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const deleteStatus = useSelector(state => state.facility.deleteFacility)

    useEffect(() => {
        if (deleteStatus.status === STATUS.SUCCESS) {
            enqueueSnackbar('Facility deleted successfully', { variant: 'success' });
            setOpenDeletePrompt(false)
            dispatch(resetAddFacilityStatus())
            dispatch(listFacilities());
        } else if (deleteStatus.status === STATUS.ERROR) {
            enqueueSnackbar('Facility delete failed', { variant: 'error' });
        }
    }, [deleteStatus, dispatch, enqueueSnackbar, setOpenDeletePrompt])

    const handleDeleteFacility = () => {
        dispatch(deleteFacility(facility?.id))
    }

    const getPrimaryConfirmDrawer = () => {
        return (
            <Box className={classes.mainContainer}>
                <Typography variant="span">Are you sure you want to delete</Typography>
                <Box fontWeight='fontWeightMedium' display='inline'>{` ${facility?.name}?`}</Box>
            </Box>
        )
    };

    return (
        <CeroSideSheetDrawer
            primaryDrawer={{
                drawerOpen: isOpen,
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
export default FacilityDeletePrompt
