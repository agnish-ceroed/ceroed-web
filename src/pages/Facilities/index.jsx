import { useEffect, useState } from "react"
import { Container } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import DashboardLayout from "../../layouts/DashboardLayout"
import { listFacilities } from "../../redux/actions"
import AddFacilityDrawer from "./AddFacilityDrawer"
import FacilitiesHeader from "./FacilitiesHeader"
import FacilitiesTable from "./FacilitiesTable"

import useStyles from './styles'

const savedPage = { // To be used from the api response
    pageNumber: 1,
};

const DEFAULT_ITEMS_PER_PAGE = 20;

const Facilities = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const facilityList = useSelector(state => state.listings.listFacilities.data)

    const [isOpenAddFacility, setOpenAddFacility] = useState(false)
    const [editFacilityItem, setEditFacilityItem] = useState(null)

    useEffect(() => {
        dispatch(listFacilities())
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
        setOpenAddFacility(false)
        setEditFacilityItem(null)
    }

    return (
        <DashboardLayout>
            <Container className={classes.container}>
                <FacilitiesHeader onAddData={() => setOpenAddFacility(true)} />
                <FacilitiesTable facilitiesData={facilityList} onLoadMore={onLoadMore} onClickEdit={(item) => setEditFacilityItem(item)} />
                {(isOpenAddFacility || editFacilityItem) &&
                    <AddFacilityDrawer
                        isOpen={isOpenAddFacility || editFacilityItem}
                        onClose={handleDrawerClose}
                        editItem={editFacilityItem}
                    />
                }
            </Container>
        </DashboardLayout>
    )
}

export default Facilities
