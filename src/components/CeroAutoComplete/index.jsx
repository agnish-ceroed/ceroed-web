import { Autocomplete, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import clsx from 'clsx'

import useStyles from './styles'

const CeroAutoComplete = (props) => {
    const classes = useStyles();

    const isOptionEqualToValue = (option, value) => option.id === value.id;

    return (
        <Box className={classes.container}>
            <Autocomplete
                disablePortal
                id={props.id}
                value={props.value}
                classes={{ root: props.error ? classes.selectError : '' }}
                options={props.options}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onInputChange={props.onInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        name={props.name}
                        label={props.label}
                        onBlur={props.onBlur}
                    />
                )}
                isOptionEqualToValue={isOptionEqualToValue}
            />
            {!!props.error && <Typography className={clsx(classes.text, classes.error, props.classes?.error)} >{props.error}</Typography>}
        </Box>
    )
}

export default CeroAutoComplete