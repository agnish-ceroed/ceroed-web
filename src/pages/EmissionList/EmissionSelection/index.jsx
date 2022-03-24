import React, { useState} from 'react';
import { Box, Typography, IconButton } from "@mui/material";
import CreateIcon from '@mui/icons-material/CreateOutlined';

import EmissionSelectionDrawer from '../EmissionSelectionDrawer';
import useStyles from "./styles";

const emissionTypes = [
    {
        id: 'environmental',
        title: 'Environmental',
        subItems: [
            {
                id: 'stationary_combustion',
                title: 'Stationary combustion',
            }, {
                id: 'mobile_combustion',
                title: 'Mobile combustion',
            }, {
                id: 'purchased_electricity',
                title: 'Purchased Electricity',
            },
            {
                id: 'refrigerants',
                title: 'Refrigerants',
            }
        ]
    }, {
        id: 'social',
        title: 'Social',
        subItems: [
        ]
    }, {
        id: 'governance',
        title: 'Governance',
        subItems: [
            {
                id: 'purchased_electricity',
                title: 'Purchased electricity',
            }
        ]
    }
];

const EmissionSelection = (props) => {
    const classes = useStyles();

    const [isOpenEmissionType, setIsOpenEmissionType] = useState(false);
    const [selectedEmission, setSelectedEmission] = useState('environmental');
    const [selectedSubEmission, setSelectedSubEmission] = useState('stationary_combustion');

    const onCloseDrawer = () => {
        setIsOpenEmissionType(false);
    };

    const onSelectEmission = (emissionType, emissionSubType) => {
        props.onSelectEmission(emissionSubType)
        setSelectedEmission(emissionType);
        setSelectedSubEmission(emissionSubType);
        setIsOpenEmissionType(false);
    }

    const emissionDisplayTitle = emissionTypes.find(item => item.id === selectedEmission)?.subItems.find(item => item.id === selectedSubEmission)?.title;

    return (
        <Box className={classes.container}>
            <Box className={classes.emissionType} >
                <Typography >{emissionDisplayTitle}</Typography>
                <IconButton onClick={() => setIsOpenEmissionType(true)}>
                    <CreateIcon  />
                </IconButton>
            </Box>
            <EmissionSelectionDrawer isOpen={isOpenEmissionType} onClose={onCloseDrawer} onSelectEmission={onSelectEmission} />
        </Box>
    )
}

export default EmissionSelection;
