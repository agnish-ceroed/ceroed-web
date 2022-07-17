import React, { useState } from 'react';
import clsx from 'clsx';
import { Box, Typography, IconButton } from "@mui/material";
import CreateIcon from '@mui/icons-material/CreateOutlined';

import EmissionSelectionDrawer from '../EmissionSelectionDrawer';
import { emissionTypeData } from '../../../constants';
import useStyles from "./styles";

const EmissionSelection = (props) => {
    const classes = useStyles();
    const emissionSelected = emissionTypeData.find(item => item.subItems.some((subItem) => !!subItem.subItems.find(type => type.id === props.emissionType)))
    const subEmissionSelected = emissionSelected?.subItems.find(type => type.subItems.find(item => item.id === props.emissionType))?.subItems.find(item => item.id === props.emissionType);
    
    const [isOpenEmissionType, setIsOpenEmissionType] = useState(false);
    const [selectedEmission, setSelectedEmission] = useState(emissionSelected?.id);
    const [selectedSubEmission, setSelectedSubEmission] = useState(props.emissionType);

    const onCloseDrawer = () => {
        setIsOpenEmissionType(false);
    };

    const onSelectEmission = (emissionType, emissionSubType) => {
        props.onSelectEmission(emissionSubType)
        setSelectedEmission(emissionType);
        setSelectedSubEmission(emissionSubType);
        setIsOpenEmissionType(false);
    }

    return (
        <Box className={classes.container}>
            <Box className={props.isDisabled ? clsx(classes.disabled, classes.emissionType) : classes.emissionType} onClick={() => setIsOpenEmissionType(true)} >
                <Typography >{subEmissionSelected?.title}</Typography>
                <CreateIcon />
            </Box>
            <EmissionSelectionDrawer isOpen={isOpenEmissionType} onClose={onCloseDrawer} emissionType={selectedSubEmission} selectedEmission={selectedEmission} onSelectEmission={onSelectEmission} />
        </Box>
    )
}

export default EmissionSelection;
