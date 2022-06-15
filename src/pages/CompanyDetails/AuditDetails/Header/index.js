import { useEffect, useState } from "react";
import { Container, Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router";

import { sampleYear } from "../../../../constants";
import CeroDropdown from "../../../../components/CeroDropdown";
import CeroButton from "../../../../components/CeroButton";
import useStyles from "./styles";

const Header = ({
  onApplyFilter,
  selectedYear,
  isApproveAuditVisible,
  onApproveAudit,
  onRaiseAuditTicket,
  isLoading,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [filterYear, setYear] = useState(selectedYear);

  useEffect(() => {
    setYear(selectedYear);
  }, [selectedYear]);

  const onChangeYear = ({ target }) => {
    setYear(target.value);
    onApplyFilter(target.value);
  }

  return (
    <Container className={classes.headerContainer}>
        <Box className={classes.backbuttonContainer}>
            <IconButton className={classes.editIcon} onClick={(e) => navigate(-1)}>
              <ArrowBackIosIcon />
            </IconButton>
        </Box>
        <Box className={classes.yearContainer}>
          <CeroDropdown
            classes={{ container: classes.dropdown }}
            id="year"
            label="Year"
            fullWidth
            options={sampleYear}
            onChange={onChangeYear}
            selectedValue={parseInt(filterYear)}
          />
        </Box>
        <Box className={classes.ticketContainer}>
          <CeroButton
            buttonText={"Raise a ticket"}
            // buttonText={isLoading ? "Loading..." : "Raise a ticket"}
            className={classes.buttonSecondary}
            onClick={onRaiseAuditTicket}
            // disabled={isLoading}
            variant="outlined"
          />
          {isApproveAuditVisible && (
            <CeroButton
              buttonText={isLoading ? "Loading..." : "Approve audit"}
              className={classes.buttonPrimary}
              onClick={onApproveAudit}
              disabled={isLoading}
            />
          )}
        </Box>
    </Container>
  );
};

export default Header;
