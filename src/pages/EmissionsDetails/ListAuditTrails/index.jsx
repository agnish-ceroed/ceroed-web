import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'

import { clearListEmissionAuditTrails, listEmissionAuditTrails } from '../../../redux/actions';
import AuditTrailCell from './AuditTrailCell';
import useStyles from "./styles";

const ListAuditTrails = ({emissionId}) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();

    const auditList = useSelector((state) => state.emission.listAuditTrails.data);

    useEffect(() => {
        dispatch(listEmissionAuditTrails(emissionId));
        return () => {
            dispatch(clearListEmissionAuditTrails);
        }
    }, [dispatch]);

    return <Box className={classes.listContainer}>
        <Box className={classes.commentContainer} >
            {auditList.map((audit, index) => (
                    <AuditTrailCell
                        key={index}
                        name={audit.audited_by_name}
                        imageUrl={audit.image_url}
                        msg={audit.comment}
                        time={audit.audited_on}
                    />
                )
            )}
            {!auditList.length && (
                <Typography variant="h7" component="span"> No Audit trails found </Typography>
            )}
        </Box>
    </Box>
};

export default ListAuditTrails;
