import { Typography, Box, CircularProgress } from "@mui/material";
import clsx from "clsx";

import useStyles from "./styles";

const CeroLoader = (props) => {
    const classes = useStyles();
    return (
        <Box className={clsx(classes.container, props.classes?.container)} >
            <Box className={clsx(classes.loaderContainer, props.classes?.loaderContainer)}>
                <CircularProgress />
                { props.loadingText && <Typography >{props.loadingText}</Typography> }
            </Box>
        </Box>
    );
};

export default CeroLoader;
