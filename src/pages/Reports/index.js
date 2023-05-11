import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Container, Typography, Box,CircularProgress} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import CeroTable from "../../components/CeroTable";
import CeroButton from "../../components/CeroButton";
import CreateReportDrawer from "./CreateReportDrawer";
import { getAllReports, listFramework, listTopic } from "../../redux/actions";
import { STATUS } from "../../redux/constants";
import Filter from "./Filter";

import useStyles from "./styles";

export const auditSummaryColumns = [
  {
    columnKey: "name",
    columnId: "name",
    columnHeader: "Report Name",
  },
  {
    columnKey: "year",
    columnId: "year",
    columnHeader: "Year",
  },
  {
    columnKey: "framework_name",
    columnId: "framework_name",
    columnHeader: "Framework",
  },
  {
    columnKey: "created_by_name",
    columnId: "created_by_name",
    columnHeader: "Created by",
  },
  {
    columnKey: "created_ts",
    columnId: "created_ts",
    columnHeader: "Created on",
  },
];

const Reports = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState({});

  const reportsList = useSelector((state) => state.reports.reportsList.data);
  const reportsListStatus = useSelector(
    (state) => state.reports.reportsList.status
  );
  const frameworkList = useSelector(
    (state) => state.listings.frameworkList.data
  );

  const onSelectAuditSummaryData = (row) => {
    navigate(`details/${row.id}`);
  };

  const getReportList = () =>
    reportsList.map((item) => ({
      ...item,
      created_ts: item.created_ts
        ? dayjs(item.created_ts).format("DD MMM YYYY HH:mm")
        : "-",
    }));

  useEffect(() => {
    dispatch(getAllReports(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(listTopic());
    dispatch(listFramework());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography variant="h6" component="span">
          Reports
        </Typography>
        <Box className={classes.buttonContainer}>
          <Filter frameworkList={frameworkList} setFilter={setFilter}/>
          <CeroButton
            buttonText="Create report"
            className={classes.buttonPrimary}
            onClick={() => setIsDrawerOpen(true)}
          />
        </Box>

        {reportsListStatus === STATUS.SUCCESS ? (
          <Container className={classes.tableContainer}>
            <CeroTable
              columns={auditSummaryColumns}
              classes={{ tableContainer: classes.tableInnerContainer }}
              data={getReportList()}
              hasMore={false}
              loading={false}
              onSelectRow={onSelectAuditSummaryData}
            />
          </Container>
        ) : (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {reportsListStatus === STATUS.RUNNING
                ? <CircularProgress/>
                : reportsListStatus === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        )}
        <CreateReportDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </Container>
    </DashboardLayout>
  );
};

export default Reports;
