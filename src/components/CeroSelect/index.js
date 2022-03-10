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
                value={props.selectedValue}
                required={!!props.required}
                disabled={!!props.disabled}
                error={!!props.error}
                onChange={props.onChange}
                onBlur={props.onBlur}
                className={classes.input}
                classes={{ root: props.classes?.root }}
                SelectProps={{ classes: { select: props.classes?.select } }}
                select
            >
                <MenuItem value="">
                    Select option
                </MenuItem>
                {props.options.length && props.options.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>
            {!!props.error && <Typography className={clsx(classes.text, classes.error, props.classes?.error)} >{props.error}</Typography>}
        </Box >
    );
};

export default CeroSelect;
