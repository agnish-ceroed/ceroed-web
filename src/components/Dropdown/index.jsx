import { MenuItem, Select, Typography, InputLabel, FormControl } from "@mui/material";
import clsx from "clsx";

import useStyles from "./styles";

const Dropdown = (props) => {
    const classes = useStyles();
    return (
        <FormControl fullWidth className={clsx(classes.container, props.classes?.container)} margin="dense" size='small' >
            <InputLabel id={`label-${props.id}`}>{props.label}</InputLabel>
            <Select
                id={props.id}
                labelId={`label-${props.id}`}
                name={props.name}
                label={props.label}
                value={props.selectedValue}
                onChange={props.onChange}
                className={classes.input}
                classes={{ select: classes.select }}
            >
                {props.options && props.options.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                        {option.value}
                    </MenuItem>
                ))}
            </Select>
            {!!props.error && <Typography className={clsx(classes.text, classes.error, props.classes?.error)} >{props.error}</Typography>}
        </FormControl >
    );
};

export default Dropdown;
