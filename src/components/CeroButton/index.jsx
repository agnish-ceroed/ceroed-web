import clsx from "clsx";

import { Button } from "@mui/material";
import useStyles from "./styles";

const CeroButton = (props) =>  {
    const classes = useStyles();
    return (
        <Button
            variant={props.variant || "contained"}
            disabled={!!props.disabled}
            onClick={props.onClick}
            className={clsx(classes.button, props.className)}
            fullWidth={!!props.fullWidth}
        >
            {props.buttonText}
        </Button>
    );
};

export default CeroButton;
