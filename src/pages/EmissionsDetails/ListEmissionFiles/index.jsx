import { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSnackbar } from 'notistack';

import { clearListEmissionFiles, clearUploadEmissionAttachement, listEmissionFiles, uploadEmissionAttachement } from '../../../redux/actions';
import AttachmentCell from './AttachmentCell';
import { STATUS } from '../../../redux/constants';
import useStyles from "./styles";

const ListEmissionFiles = ({emissionId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const fileList = useSelector((state) => state.emission.listFiles.data);
    const uploadAttachementState = useSelector((state) => state.emission.uploadAttachement);

    useEffect(() => {
        dispatch(listEmissionFiles(emissionId));
        return () => {
            dispatch(clearListEmissionFiles);
            dispatch(clearUploadEmissionAttachement());
        }
    }, [dispatch]);

    useEffect(() => {
        if(uploadAttachementState.status === STATUS.SUCCESS) {
            enqueueSnackbar('Attachment added successfully', { variant: 'success' });
            dispatch(listEmissionFiles(emissionId));
        } else if (uploadAttachementState.status === STATUS.ERROR) {
            enqueueSnackbar(uploadAttachementState.message || "Something went wrong", { variant: 'error' });
        }
    }, [uploadAttachementState]);

    const onFileUpload = ({ target }) =>{
        dispatch(uploadEmissionAttachement(emissionId, target.files[0]))
    };

    const onDeleteAttachement = (file) => {

    };

    return <Box className={classes.listContainer}>
        <Box>
        <Button variant="contained" component="label" color="primary">
            {uploadAttachementState.status === STATUS.RUNNING ? (
                <>
                    <RefreshIcon/> Uploading
                </>
            ) : (
                <>
                    <AddIcon/> Upload a file
                    <input type="file" hidden onChange={onFileUpload} />
                </>
            )}
        </Button>
        </Box>
        <Box className={classes.fileListContainer} >
            {fileList.map((file, index) => (
                    <AttachmentCell
                        key={index}
                        url={file.blob_url}
                        imageName={file.file_name}
                        imageType={file.content_type}
                        attachmentId={file.id}
                        onDeleteAttachment={onDeleteAttachement}
                    />
                )
            )}
            {!fileList.length && (
                <Typography variant="h7" component="span"> No Attachment found </Typography>
            )}
        </Box>
    </Box>
};

export default ListEmissionFiles;
