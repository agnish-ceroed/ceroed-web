import { Container, Divider, Typography, Button } from "@mui/material";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

import useStyles from "./styles";

const PermissionDenied = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography className={classes.animateLeft} variant="h2">
          Access Denied
        </Typography>
        <Divider className={classes.divider} />
        <Typography
          className={clsx(classes.animateRight, classes.primaryColor)}
          variant="h5"
          fontStyle={"italic"}
        >
          You dont have permission to access this page.
        </Typography>
        <Button onClick={() => navigate(-1)} className={classes.animateTop}>
          Go back
        </Button>
      </Container>
    </DashboardLayout>
  );
};

export default PermissionDenied;
