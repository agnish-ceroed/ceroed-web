import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

import useStyles from "./styles";

const AttachmentCell = (props) => {
    
    const classes = useStyles();
    const userImage = require('../../../../assets/pdf-placeholder.png');

    const downloadFile = () => {
        const a = document.createElement('a');
        a.href = props.url;
        a.download = props.url.split('/').pop();
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    return <Box className={classes.attachmentContainer}>
        <Box className={classes.fileContainer}>
            <img
                alt={props.imageName}
                className={classes.image}
                src={props.imageType === 'application/pdf' ? userImage : props.url}
            />
        </Box>
        <Box className={classes.buttonContainer} >
            <IconButton aria-label="download" onClick={downloadFile}>
                <FileDownloadIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => props.onDeleteAttachment(props.attachmentId)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    </Box>
};

export default AttachmentCell;
