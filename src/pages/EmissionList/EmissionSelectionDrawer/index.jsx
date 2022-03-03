import React, { useState } from 'react';
import { Box, Checkbox, Typography } from "@mui/material";

import CeroSideSheetDrawer from '../../../components/CeroSideSheetDrawer';
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
            }
        ]
    }, {
        id: 'social',
        title: 'Social',
        subItems: [
            {
                id: 'refridgerants',
                title: 'Refridgerants',
            }
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

const EmissionSelectionDrawer = (props) => {
    const classes = useStyles();

    const [selectedEmission, setSelectedEmission] = useState();
    const [selectedSubEmission, setSelectedSubEmission] = useState();

    const onCloseSideDrawer = () => {
        setSelectedEmission(null);
    };

    const onEmissionSelection = () => {
        props.onSelectEmission(selectedEmission, selectedSubEmission);
    };

    const handleEmissionChange = (event) => {
        setSelectedEmission(event.target.name);
        setSelectedSubEmission(null);
    };

    const handleSubEmissionChange = (event) => {
        setSelectedSubEmission(event.target.name);
    };

    const getPrimaryPaymentDrawer = () => {
        return (
            <Box className={classes.mainContainer}>
                {emissionTypes.map(type => (<Box className={classes.typeItem}>
                    <Typography >{type.title}</Typography>
                    <Checkbox checked={selectedEmission === type.id} onChange={handleEmissionChange} name={type.id} />
                </Box>))}
            </Box>
        )
    };

    const getSecondaryDrawer = () => {
        const subEmissions = emissionTypes.find(item => item.id === selectedEmission);
        console.log('selectedEmission', selectedEmission, subEmissions)
        return (
            <Box className={classes.mainContainer}>
                {subEmissions?.subItems.map(type => (<Box className={classes.typeItem}>
                    <Typography >{type.title}</Typography>
                    <Checkbox checked={selectedSubEmission === type.id} onChange={handleSubEmissionChange} name={type.id} />
                </Box>))}
            </Box>
        )
    };

    return (
        <CeroSideSheetDrawer
          primaryDrawer={{
            drawerOpen: props.isOpen,
            onClose: props.onClose,
            content: getPrimaryPaymentDrawer(),
            header: { title: "Emission Types" },
            footer: {
              hideSecondaryBtn: true,
              hidePrimaryBtn: true,
            },
            classes: {
              drawerContainer: classes.drawerContainer,
              contentArea: classes.drawerContentArea,
            },
          }}
          secondaryDrawer={{
            drawerOpen: selectedEmission,
            onClose: onCloseSideDrawer,
            content: getSecondaryDrawer(),
            header: { title: 'Options' },
            footer: {
              primaryBtnTitle: 'Done',
              disablePrimaryBtn: !selectedSubEmission,
              hideSecondaryBtn: true,
              primaryBtnAction: onEmissionSelection,
            },
            classes: { contentArea: classes.drawerContentArea },
          }}
        />
      );
}

export default EmissionSelectionDrawer;
