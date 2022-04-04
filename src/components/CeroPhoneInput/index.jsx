import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";
import MuiPhoneNumber from "material-ui-phone-number";

import useStyles from "./styles";

const CeroPhoneInput = (props) => {
    const classes = useStyles();
    return (
        <Box className={clsx(classes.container, props.classes?.container)} >
            <MuiPhoneNumber
                defaultCountry="in"
                autoFormat={false}
                id={props.id}
                name={props.name}
                label={props.label}
                variant={props.variant || "outlined"}
                value={props.value}
                rows={props.rows || 1}
                required={!!props.required}
                multiline={props.multiline}
                disabled={!!props.disabled}
                error={!!props.error}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onBlur={props.onBlur}
                className={clsx(classes.input, props.classes?.input)}
                type={props.type || "text"}
                helperText={props.helperText}
                InputProps={{ ...props.inputProps }}
            />
            {!!props.error && <Typography className={clsx(classes.text, classes.error, props.classes?.error)} >{props.error}</Typography>}
        </Box>
    );
};

export default CeroPhoneInput;
