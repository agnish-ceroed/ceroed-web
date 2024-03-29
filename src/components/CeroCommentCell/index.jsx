import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import dayjs from "dayjs";

import useStyles from "./styles";

const CeroCommentCell = (props) => {
    
    const classes = useStyles();

    return <Box className={classes.commentContainer}>
        <Box>
            <Avatar alt={props.name} src={props.imageUrl} children={props.name?.charAt(0)?.toUpperCase()} />
        </Box>
        <Box className={classes.messageContainer}>
            <Typography className={classes.name}>{props.name}</Typography>
            <Typography className={classes.msg}>{props.msg}</Typography>
            <Typography className={classes.date}>{dayjs(props.time).format("DD MMM YYYY hh:mm A")}</Typography>
        </Box>
    </Box>
};

export default CeroCommentCell;
