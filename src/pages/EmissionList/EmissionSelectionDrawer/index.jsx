import React, { useState } from 'react';
import { Box, Checkbox, Typography } from "@mui/material";

import CeroSideSheetDrawer from '../../../components/CeroSideSheetDrawer';
import { emissionTypeData } from '../../../constants';
import useStyles from "./styles";  

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
                {emissionTypeData.map(type => (<Box className={classes.typeItem}>
                    <Typography >{type.title}</Typography>
                    <Checkbox checked={selectedEmission === type.id} onChange={handleEmissionChange} name={type.id} />
                </Box>))}
            </Box>
        )
    };

    const getSecondaryDrawer = () => {
        const subEmissions = emissionTypeData.find(item => item.id === selectedEmission);
        return (
            <Box className={classes.mainContainer}>
                {subEmissions?.subItems.map(group => (<Box className={classes.typeItemGroup}>
                    <Typography className={classes.tyupeItemGroupTitle}>{group.title}</Typography>
                    {group?.subItems.map(type => (<Box className={classes.typeItem}>
                        <Typography >{type.title}</Typography>
                        <Checkbox checked={selectedSubEmission === type.id} onChange={handleSubEmissionChange} name={type.id} />
                    </Box>))}
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
