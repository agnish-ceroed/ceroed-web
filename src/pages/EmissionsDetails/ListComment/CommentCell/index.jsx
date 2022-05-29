import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

import useStyles from "./styles";

const CommentCell = ({commentDetails}) => {
    
    const classes = useStyles();

    return <Box className={classes.commentContainer}>
        <Box>
            <Avatar alt={commentDetails.name} src={commentDetails.imageUrl} />
        </Box>
        <Box className={classes.messageContainer}>
            <Typography className={classes.name}>{commentDetails.name}</Typography>
            <Typography className={classes.msg}>{commentDetails.msg}</Typography>
        </Box>
    </Box>
};

export default CommentCell;
