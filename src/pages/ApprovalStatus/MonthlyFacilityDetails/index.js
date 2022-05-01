import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import DashboardLayout from "../../../layouts/DashboardLayout";
import CeroTable from "../../../components/CeroTable";
import { listFacilities } from "../../../redux/actions";
import Header from "./Header";
import Status from "./Status";

import useStyles from "./styles";

const combustionSummaryData = [
  {
    topic: "Stationary combustion",
    co2: "0.05 tonnes",
    ch4: "0.05 tonnes",
    n2o: "0.05 tonnes",
    co2e: "0.05 tonnes",
    bio: "0.05 tonnes",
    ef: "0.05 tonnes",
  },
  {
    topic: "Mobile combustion",
    co2: "0.05 tonnes",
    ch4: "0.05 tonnes",
    n2o: "0.05 tonnes",
    co2e: "0.05 tonnes",
    bio: "0.05 tonnes",
    ef: "0.05 tonnes",
  },
  {
    topic: "CNC",
    co2: "0.05 tonnes",
    ch4: "0.05 tonnes",
    n2o: "0.05 tonnes",
    co2e: "0.05 tonnes",
    bio: "0.05 tonnes",
    ef: "0.05 tonnes",
  },
];

const waterSummaryData = [
  {
    topic: "Water consumption",
    amount: "0.05 tonnes",
    records: "2",
  },
  {
    topic: "Water discharge",
    amount: "0.05 tonnes",
    records: "4",
  },
];

const wasteSummaryData = [
  {
    topic: "Waste",
    amount: "0.05 tonnes",
    bioFuel: "0.05 tonnes",
    records: "2",
  },
];

const MonthlyFacilityDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const facilitiesData = useSelector(
    (state) => state.listings.listFacilities.data
  );

  const facilitiesList = facilitiesData.map((item) => ({
    key: item.id,
    value: item.name,
  }));

  const pathNameArr = pathname.split(":");
  const decodedFilter = decodeURI(pathNameArr[1]).split("_");
  const selectedYear = decodedFilter[0];
  const selectedMonth = decodedFilter[1];
  const selectedFacility = decodedFilter[2];

  const onSelectCombustionSummaryData = (row) => {
    console.log(row);
  };

  const onSelectWaterSummaryData = (row) => {
    console.log(row);
  };

  const onSelectWasteSummaryData = (row) => {
    console.log(row);
  };

  useEffect(() => {
    dispatch(listFacilities());
  }, []);

  const combustionSummaryColumns = [
    {
      columnKey: "topic",
      columnId: "topic",
      columnHeader: "Topic",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "co2",
      columnId: "co2",
      columnHeader: "CO2 (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "ch4",
      columnId: "ch4",
      columnHeader: "CH4 (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "n2o",
      columnId: "n2o",
      columnHeader: "N2O (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "co2e",
      columnId: "co2e",
      columnHeader: "CO2e (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "bio",
      columnId: "bio",
      columnHeader: "Biofuel CO2e (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "ef",
      columnId: "ef",
      columnHeader: "EF (kgCO2e/unit)",
      classes: { column: classes.cellContainer },
    },
  ];

  const waterSummaryColumns = [
    {
      columnKey: "topic",
      columnId: "topic",
      columnHeader: "Topic",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "amount",
      columnId: "amount",
      columnHeader: "Amount",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "records",
      columnId: "records",
      columnHeader: "No or records",
      classes: { column: classes.cellContainer },
    },
  ];

  const wasteSummaryColumns = [
    {
      columnKey: "topic",
      columnId: "topic",
      columnHeader: "Topic",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "amount",
      columnId: "amount",
      columnHeader: "Amount",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "bioFuel",
      columnId: "bioFuel",
      columnHeader: "Biofuel CO2 (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "records",
      columnId: "records",
      columnHeader: "No or records",
      classes: { column: classes.cellContainer },
    },
  ];

  const onApplyFilter = (year) => {
    console.log(year);
  };

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Header
          onApplyFilter={onApplyFilter}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedFacility={selectedFacility}
          facilitiesList={facilitiesList}
        />
        <Status
          status="Approved"
          approvedBy="John Doe"
          auditStatus="Pending"
          noOfTickets="01/04"
          approvedDate="02/12/2021"
          auditorStatus="Not assigned"
        />
        <Container className={classes.tableContainer}>
          <CeroTable
            columns={combustionSummaryColumns}
            data={combustionSummaryData}
            hasMore={false}
            loading={false}
            onSelectRow={onSelectCombustionSummaryData}
          />
        </Container>
        <Container className={classes.tableContainer}>
          <CeroTable
            columns={waterSummaryColumns}
            data={waterSummaryData}
            hasMore={false}
            loading={false}
            onSelectRow={onSelectWaterSummaryData}
          />
        </Container>
        <Container className={classes.tableContainer}>
          <CeroTable
            columns={wasteSummaryColumns}
            data={wasteSummaryData}
            hasMore={false}
            loading={false}
            onSelectRow={onSelectWasteSummaryData}
          />
        </Container>
      </Container>
    </DashboardLayout>
  );
};

export default MonthlyFacilityDetails;
