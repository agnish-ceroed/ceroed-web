import { Grid } from "@mui/material"

import CeroButton from "../../../components/CeroButton"
import useStyles from './styles'

const UserHeader = ({ onAddData }) => {
    const classes = useStyles()

    return (
        <Grid container className={classes.container} alignItems="center" justifyContent="flex-end">
            <Grid item xs={1.5}>
                <CeroButton
                    buttonText="Add User"
                    className={classes.button}
                    onClick={onAddData}
                />
            </Grid>
        </Grid>
    )
}

export default UserHeader
