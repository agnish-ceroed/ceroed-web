import { Paper, Typography } from "@mui/material"
import clsx from "clsx";

import useStyles from "./styles";


const GoalCard = ({ title, description, onClick, selected }) => {
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={clsx(classes.goalCard, selected === title && classes.active)} onClick={onClick}>
            <Typography gutterBottom variant="h6" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </Paper>
    )
}

export default GoalCard
