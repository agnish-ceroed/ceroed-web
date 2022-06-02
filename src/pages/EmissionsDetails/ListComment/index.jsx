import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';
import clsx from 'clsx';

import { addEmissionComment, clearAddEmissionComment, listEmissionComments, resetListEmissionComments } from '../../../redux/actions';
import CeroCommentCell from '../../../components/CeroCommentCell';
import CeroInput from '../../../components/CeroInput';
import CeroButton from '../../../components/CeroButton';
import { STATUS } from '../../../redux/constants';
import useStyles from "./styles";

const ListComments = ({emissionId}) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [comment, setComment] = useState('');

    const comments = useSelector((state) => state.emissionComment.listEmissionComments.data);
    const addCommentState = useSelector((state) => state.emissionComment.addEmissionComment);

    useEffect(() => {
        dispatch(listEmissionComments(emissionId));
        return () => {
            dispatch(resetListEmissionComments());
        }
    }, [dispatch]);

    useEffect(() => {
        if (addCommentState.status === STATUS.SUCCESS) {
            enqueueSnackbar('Comment added successfully', { variant: 'success' });
            dispatch(listEmissionComments(emissionId));
            dispatch(clearAddEmissionComment(emissionId));
            setComment('');
        } else if(addCommentState.status === STATUS.ERROR) {
            enqueueSnackbar(addCommentState.message || "Add comment failed due to some reason", { variant: 'error' });
        }
    }, [addCommentState.status])

    const onAddComment = () => {
        dispatch(addEmissionComment(emissionId, comment));
    };

    return <Box className={classes.listContainer}>
        <Box className={classes.commentBox}>
            <CeroInput
                classes={{ container: classes.textArea }}
                rows={3}
                multiline
                id="comment"
                name="comment"
                label="Comment"
                placeholder="Please type your comment"
                value={comment}
                fullWidth
                onChange={({ target }) => setComment(target.value)}
            />
            <CeroButton
                buttonText={
                    addCommentState.status === STATUS.RUNNING ? "Commenting..." : "Add comment"
                }
                className={clsx(
                classes.buttonPrimary,
                classes.commentButton
                )}
                onClick={onAddComment}
                disabled={!comment || addCommentState.status === STATUS.RUNNING}
            />
        </Box>
        <Box className={classes.commentContainer} >
            {comments.map((comment, index) => (
                    <CeroCommentCell
                        key={index}
                        name={comment.commented_by_name}
                        imageUrl={comment.image_url}
                        msg={comment.comment}
                        time={comment.commented_on}
                    />
                )
            )}
            {!comments.length && (
                <Typography variant="h7" component="span"> No comments yet </Typography>
            )}
        </Box>
    </Box>
};

export default ListComments;
