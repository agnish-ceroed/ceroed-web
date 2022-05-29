import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { listEmissionComments } from '../../../redux/actions';
import CommentCell from './CommentCell';
import useStyles from "./styles";

const commentlist = [{
    name: "ajesh babu",
    msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
}, {
    name: "Gopikrishnan",
    msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
}]

const ListComments = ({emissionId}) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.emissionComment.listEmissionComments);
    console.log("comments", comments);

    useEffect(() => {
        dispatch(listEmissionComments(emissionId));
    }, [dispatch]);

    return <Box className={classes.listContainer}>
        {commentlist.map(comment => <CommentCell commentDetails={comment} />)}
    </Box>
};

export default ListComments;
