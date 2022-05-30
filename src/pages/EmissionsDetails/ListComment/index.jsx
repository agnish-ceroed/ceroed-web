import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx';

import { listEmissionComments } from '../../../redux/actions';
import CeroCommentCell from '../../../components/CeroCommentCell';
import CeroInput from '../../../components/CeroInput';
import CeroButton from '../../../components/CeroButton';
import useStyles from "./styles";

const ListComments = ({emissionId}) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const isCommentLoading = false;

    const [comment, setComment] = useState('');

    const comments = useSelector((state) => state.emissionComment.listEmissionComments.data);

    useEffect(() => {
        dispatch(listEmissionComments(emissionId));
    }, [dispatch]);

    const onAddComment = () => {

    };

    return <Box className={classes.listContainer}>
        <Typography variant="h6" component="span">Comments</Typography>
        <Box className={classes.commentContainer} >
            {comments.map((comment, index) => (
                    <CeroCommentCell
                        key={index}
                        name={comment.name}
                        imageUrl={comment.image_url}
                        msg={comment.msg}
                        time={comment.time}
                    />
                )
            )}
            {!comments.length && (
                <Typography variant="h7" component="span"> No comments yet </Typography>
            )}
        </Box>
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
                isCommentLoading ? "Commenting..." : "Add comment"
                }
                className={clsx(
                classes.buttonPrimary,
                classes.commentButton
                )}
                onClick={onAddComment}
                disabled={!comment || isCommentLoading}
            />
        </Box>
    </Box>
};

export default ListComments;
