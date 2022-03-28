import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CeroSideSheetDrawer from '../../../components/CeroSideSheetDrawer';
import { emissionTypeData } from '../../../constants';
import useStyles from "./styles";  

const EmissionSelectionDrawer = (props) => {
    const classes = useStyles();

    const [selectedEmission, setSelectedEmission] = useState(props.selectedEmission);
    const [selectedSubEmission, setSelectedSubEmission] = useState();

    const onCloseSideDrawer = () => {
        setSelectedEmission(null);
    };

    const handleEmissionChange = (emission) => {
        setSelectedEmission(emission);
        setSelectedSubEmission(null);
    };

    const handleSubEmissionChange = (emission) => {
        setSelectedSubEmission(emission);
        props.onSelectEmission(selectedEmission, emission);
    };

    const getPrimaryPaymentDrawer = () => {
        return (
            <Box className={classes.mainContainer}>
                {emissionTypeData.map(type => (<Box className={classes.typeItem} onClick={() => handleEmissionChange(type.id)}>
                    <Typography >{type.title}</Typography>
                    <ArrowForwardIosIcon />
                    {/* <Checkbox checked={selectedEmission === type.id} onChange={handleEmissionChange} name={type.id} /> */}
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
                    {group?.subItems.map(type => (<Box className={classes.typeItem} onClick={() => handleSubEmissionChange(type.id)}>
                        <Typography >{type.title}</Typography>
                        {/* <Checkbox checked={selectedSubEmission === type.id} onChange={handleSubEmissionChange} name={type.id} /> */}
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
            // footer: {
            //   primaryBtnTitle: 'Done',
            //   disablePrimaryBtn: !selectedSubEmission,
            //   hideSecondaryBtn: true,
            //   primaryBtnAction: onEmissionSelection,
            // },
            footer: {
              primaryBtnTitle: 'Done',
              disablePrimaryBtn: !selectedSubEmission,
              hideSecondaryBtn: true,
              hidePrimaryBtn: true,
            },
            classes: { contentArea: classes.drawerContentArea },
          }}
        />
      );
}

export default EmissionSelectionDrawer;
