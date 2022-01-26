import clsx from "clsx";

import { Button } from "@mui/material";
import useStyles from "./styles";

const Button = (props) =>  {
    const classes = useStyles();
    return (
        <Button
            variant={props.variant || "contained"}
            disabled={props.disabled}
            onClick={props.onClick}
            classes={clsx(classes.button, props.classes)}
        >
            {buttonText}
        </Button>
    );
};

export const Button;