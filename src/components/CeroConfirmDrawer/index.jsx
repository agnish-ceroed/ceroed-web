import { Box, Button, Typography } from "@mui/material";
import clsx from "clsx";

import CeroSideSheetDrawer from "../../components/CeroSideSheetDrawer";
import useStyles from "./styles";

const CeroConfirmDrawer = (props) => {
  const deleteImage = require('./../../assets/delete-confirm.jpg');
  const classes = useStyles();

  const getConfirmContent = () => {
    return (
        <Box className={classes.mainContainer}>
            <img className={clsx(classes.image, props.classes?.image)} alt="confirmation" src={props.confrimImage || deleteImage} />
            <Typography className={classes.title} >{props.title || "Do you want to delete?"}</Typography>
            <Typography className={classes.subtitle} >{props.subtitle || "You are doing a irreversible process"}</Typography>
            <Box className={classes.buttonContainer}>
                <Button className={classes.secondaryButton} onClick={props.onClose} size="small" variant="outlined">
                    {props.leftButtonText || "Cancel"}
                </Button>
                <Button className={classes.primaryButton} onClick={props.onConfirm} size="small" variant="contained">
                    {props.rightButtonText || "Confirm"}
                </Button>
            </Box>
        </Box>
    );
  };

  return (
    <CeroSideSheetDrawer
      primaryDrawer={{
        drawerOpen: props.isOpen,
        onClose: props.onClose,
        content: getConfirmContent(),
        hideHeader: true,
        hideFooter: true,
        classes: {
          drawerContainer: classes.drawerContainer,
          contentArea: classes.drawerContentArea,
        },
      }}
    />
  );
};

export default CeroConfirmDrawer;
