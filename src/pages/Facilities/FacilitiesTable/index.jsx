import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import CeroButton from '../../../components/CeroButton';
import CeroTable from '../../../components/CeroTable';
import FacilityDeletePrompt from '../FacilityDeletePrompt'

import useStyles from "./styles";

const FacilitiesTable = (props) => {
    const [openDeletePrompt, setOpenDeletePrompt] = useState(false)
    const [deleteFacility, setDeleteFacility] = useState({})

    const classes = useStyles();
    // const navigate = useNavigate();

    const columns = [{
        columnKey: 'name',
        columnId: 'name',
        columnHeader: 'Name',
    }, {
        columnKey: 'country_name',
        columnId: 'country_name',
        columnHeader: 'Location',
    }, {
        columnKey: 'action',
        columnId: 'action',
        columnHeader: '',
        align: 'right'
    }]

    const handleDelete = (item) => {
        setOpenDeletePrompt(true)
        setDeleteFacility(item)
    }

    const getEmissionData = () => props.facilitiesData.map(item => ({
        ...item,
        action: (
            <>
                <CeroButton className={classes.button} buttonText="Edit" onClick={(e) => {
                    props.onClickEdit(item.id)
                    e.stopPropagation()
                }} />
                <CeroButton className={classes.button} buttonText="Delete" onClick={(e) => {
                    handleDelete(item)
                    e.stopPropagation()
                }} />
            </>
        )
    }))


    return (
        <>
            <CeroTable
                columns={columns}
                data={getEmissionData()}
                hasMore={false}
                loading={false}
                loadMore={props.onLoadMore}
                classes={{ tableContainer: classes.tableContainer }}
            />
            <FacilityDeletePrompt facility={deleteFacility} isOpen={openDeletePrompt} setOpenDeletePrompt={setOpenDeletePrompt} />
        </>
    )
}

export default FacilitiesTable;
