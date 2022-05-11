import { Typography, Box } from "@mui/material";
import clsx from "clsx";

import useStyles from "./styles";

const CeroInfoPair = (props) => {
    const classes = useStyles();
    return (
        <Box className={clsx(classes.container, props.classes?.container)} >
            <Typography className={clsx(classes.title, props.classes?.title)} >{props.title}</Typography>
            <Typography className={clsx(classes.value, props.classes?.value)} >{props.value || '-'}</Typography>
        </Box>
    );
};

export default CeroInfoPair;
