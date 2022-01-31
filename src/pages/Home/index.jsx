import { Container, Typography, Grid, Paper } from "@mui/material";

import CeroButton from '../../components/CeroButton';
import useStyles from "./styles";

const Home = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.home}>
            <Container className={classes.container}>
                <Grid container justifyContent='center'>
                    <Typography color='grey' variant="h3" component="h2" className={classes.title}>CeroED</Typography>
                </Grid>
                <Grid container justifyContent='flex-end'>
                    <Grid xs={12} md={4} justifyContent='center'>
                        <Paper className={classes.card}>
                            <Grid justifyContent='center'>
                                <Typography variant="h5" className={classes.cardTitle} align="center">User type</Typography>
                                <Grid container justifyContent='center' spacing={4}>
                                    <Grid item>
                                        <CeroButton buttonText='Business' className={classes.button} />
                                    </Grid>
                                    <Grid item>
                                        <CeroButton buttonText='Auditor' className={classes.button} />
                                    </Grid>
                                    <Grid item>
                                        <CeroButton buttonText='Community' className={classes.button} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grid >
    );
};

export default Home;
