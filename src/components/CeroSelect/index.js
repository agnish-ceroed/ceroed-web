import { MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";

import useStyles from "./styles";

const CeroSelect = (props) => {
    const classes = useStyles();
    return (
        <Box className={clsx(classes.container, props.classes?.container)} >
            <TextField
                id={props.id}
                name={props.name}
                label={props.label}
                variant={props.variant || "outlined"}
                value={props.value}
                required={!!props.required}
                disabled={!!props.disabled}
                error={!!props.error}
                onChange={props.onChange}
                onBlur={props.onBlur}
                classes={clsx(classes.input, props.classes?.input)}
                select
            >
                {props.selectValues && props.selectValues.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            {!!props.error && <Typography className={clsx(classes.text, classes.error, props.classes?.error)} >{props.error}</Typography>}
        </Box >
    );
};

export default CeroSelect;
