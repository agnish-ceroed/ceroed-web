import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSnackbar } from 'notistack';

import {
    clearListEmissionFiles,
    clearUploadEmissionAttachement,
    deleteEmissionAttachement,
    listEmissionFiles,
    uploadEmissionAttachement,
} from '../../../redux/actions';
import AttachmentCell from './AttachmentCell';
import { STATUS } from '../../../redux/constants';
import useStyles from "./styles";
import CeroConfirmDrawer from '../../../components/CeroConfirmDrawer';

const ListEmissionFiles = ({emissionId, isAuditor, company}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [showConfirm, setShowConfrim] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');

    const fileList = useSelector((state) => state.emission.listFiles.data);
    const uploadAttachementState = useSelector((state) => state.emission.uploadAttachement);
    const deleteAttachementState = useSelector((state) => state.emission.deleteAttachement);

    useEffect(() => {
        dispatch(listEmissionFiles({emissionId, isAuditor, company}));
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

    useEffect(() => {
        if(deleteAttachementState.status === STATUS.SUCCESS) {
            enqueueSnackbar('Attachment deleted successfully', { variant: 'success' });
            dispatch(listEmissionFiles(emissionId));
            setSelectedFile('');
            setShowConfrim(false);
        } else if (deleteAttachementState.status === STATUS.ERROR) {
            enqueueSnackbar(deleteAttachementState.message || "Something went wrong", { variant: 'error' });
        }
    }, [deleteAttachementState]);

    const onFileUpload = ({ target }) =>{
        dispatch(uploadEmissionAttachement(emissionId, target.files[0]))
    };

    const onDeleteAttachement = (fileId) => {
        setSelectedFile(fileId);
        setShowConfrim(true);
    };

    const onConfirmDelete = () => {
        dispatch(deleteEmissionAttachement(emissionId, selectedFile));
    }

    const onCancelDelete = () => {
        setSelectedFile('');
        setShowConfrim(false);
    }

    return <Box className={classes.listContainer}>
        <Box>
        <Button variant="contained" component="label" color="primary" disabled={isAuditor}>
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
                        key={file.id}
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
        {showConfirm && <CeroConfirmDrawer
            isOpen={showConfirm}
            onClose={onCancelDelete}
            onConfirm={onConfirmDelete}
        />}
    </Box>
};

export default ListEmissionFiles;
