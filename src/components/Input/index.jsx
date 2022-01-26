import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";

import useStyles from "./styles";

const Input = (props) => {
    const classes = useStyles();
    return (
        <Box className={clsx(classes.container, props.classes?.container)} >
            <TextField
                label="Outlined"
                variant={props.variant || "outlined"}
                type={props.type || "text"}
                value={props.value}
                rows={props.rows || 1}
                required={props.required}
                multiline={props.multiline}
                disabled={props.disabled}
                error={!!props.error}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onBlur={props.onBlur}
                classes={clsx(classes.input, props.classes?.input)}
            />  
            {!!props.error && <Typography className={clsx(classes.text, classes.error, props.classes?.error)} >{props.error}</Typography>}
        </Box>
    );
};

export default Input;
