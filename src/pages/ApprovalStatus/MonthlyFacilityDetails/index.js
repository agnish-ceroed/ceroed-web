import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import DashboardLayout from "../../../layouts/DashboardLayout";
import CeroTable from "../../../components/CeroTable";
import { getApprovalMonthlyDetails, getApprovalMonthlySummary, listFacilities } from "../../../redux/actions";
import Header from "./Header";
import Status from "./Status";

import useStyles from "./styles";

const MonthlyFacilityDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const facilitiesData = useSelector((state) => state.listings.listFacilities.data);
  const approvalData = useSelector((state) => state.approval.approvalMonthlyDetails.data);
  const approvalSummaryData = useSelector((state) => state.approval.approvalMonthlySummary.data);

  const stationaryCombustionData = approvalData.filter(item => item.type === 'stationary_combustion');
  const mobileCombustionData = approvalData.filter(item => item.type === 'mobile_combustion');
  const refrigerantsCombustionData = approvalData.filter(item => item.type === 'refrigerants');
  const transportationCombustionData = approvalData.filter(item => item.type === 'transportation');
  const waterDischargeCombustionData = approvalData.filter(item => item.type === 'water_discharge');
  const waterConsumptionCombustionData = approvalData.filter(item => item.type === 'water_consumption');
  const wasteCombustionData = approvalData.filter(item => item.type === 'waste');
  const purchasedElectricityCombustionData = approvalData.filter(item => item.type === 'purchased_electricity');

  const energyAndMaterialsData = [
    ...stationaryCombustionData,
    ...mobileCombustionData,
    ...purchasedElectricityCombustionData,
    ...refrigerantsCombustionData,
    ...transportationCombustionData,
  ];
  const waterData = [ ...waterDischargeCombustionData, ...waterConsumptionCombustionData ];

  const facilitiesList = facilitiesData.map((item) => ({
    key: item.id,
    value: item.name,
  }));

  const { year } = useParams();
  const queryParams = new URLSearchParams(window.location.search)
  const selectedMonth = queryParams.get("month");
  const selectedFacility = queryParams.get("facility");
  const selectedId = queryParams.get("id");

  const onSelectData = (row) => {
    navigate(
      `/emissions/${row.type}${year && `?year=${year}`}${
        selectedMonth ? `&month=${selectedMonth}` : ""
      }${selectedFacility ? `&facility=${selectedFacility}` : ""}`
    );
  };

  useEffect(() => {
    dispatch(listFacilities());
    dispatch(getApprovalMonthlyDetails(selectedId, year, selectedMonth, selectedFacility ));
    dispatch(getApprovalMonthlySummary(selectedId, year, selectedMonth, selectedFacility ));
  }, []);

  const combustionSummaryColumns = [
    {
      columnKey: "sector",
      columnId: "sector",
      columnHeader: "Sector",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "topic",
      columnId: "topic",
      columnHeader: "Topic",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_co2",
      columnId: "total_co2",
      columnHeader: "CO2 (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_ch4",
      columnId: "total_ch4",
      columnHeader: "CH4 (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_n2o",
      columnId: "total_n2o",
      columnHeader: "N2O (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_co2e",
      columnId: "total_co2e",
      columnHeader: "CO2e (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_bio",
      columnId: "total_bio",
      columnHeader: "Biofuel CO2e (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_ef",
      columnId: "total_ef",
      columnHeader: "EF (kgCO2e/unit)",
      classes: { column: classes.cellContainer },
    },
  ];

  const waterSummaryColumns = [
    {
      columnKey: "sector",
      columnId: "sector",
      columnHeader: "Sector",
      classes: { column: classes.cellContainer },
    },
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
      columnKey: "total_records",
      columnId: "total_records",
      columnHeader: "No or records",
      classes: { column: classes.cellContainer },
    },
  ];

  const wasteSummaryColumns = [
    {
      columnKey: "sector",
      columnId: "sector",
      columnHeader: "Sector",
      classes: { column: classes.cellContainer },
    },{
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
      columnKey: "total_bioFuel",
      columnId: "total_bioFuel",
      columnHeader: "Biofuel CO2 (tonnes)",
      classes: { column: classes.cellContainer },
    },
    {
      columnKey: "total_records",
      columnId: "total_records",
      columnHeader: "No or records",
      classes: { column: classes.cellContainer },
    },
  ];

  const onApplyFilter = (filter) => {
    navigate(
      `/approval-status/${filter.year}${
        filter.month ? `_${filter.month}` : ""
      }${filter.facility ? `_${filter.facility}` : ""}`
    );
  };

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Header
          onApplyFilter={onApplyFilter}
          selectedYear={year}
          selectedMonth={selectedMonth}
          selectedFacility={selectedFacility}
          facilitiesList={facilitiesList}
        />
        <Status
          status={approvalSummaryData.status}
          approvedBy={approvalSummaryData.assigned_auditor_name}
          auditStatus={approvalSummaryData.audited_status}
          noOfTickets={approvalSummaryData.open_tickets}
          auditorAssigned={approvalSummaryData.assigned_to_name}
          auditorStatus={approvalSummaryData.audited_status}
        />
        {!!energyAndMaterialsData.length && (
          <Container className={classes.tableContainer}>
            <CeroTable
              columns={combustionSummaryColumns}
              data={energyAndMaterialsData}
              hasMore={false}
              loading={false}
              onSelectRow={onSelectData}
            />
          </Container>
        )}
        {!!waterData.length && (
          <Container className={classes.tableContainer}>
            <CeroTable
              columns={waterSummaryColumns}
              data={waterData}
              hasMore={false}
              loading={false}
              onSelectRow={onSelectData}
            />
          </Container>
        )}
        { !!wasteCombustionData.length && (
          <Container className={classes.tableContainer}>
            <CeroTable
              columns={wasteSummaryColumns}
              data={wasteCombustionData}
              hasMore={false}
              loading={false}
              onSelectRow={onSelectData}
            />
          </Container>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default MonthlyFacilityDetails;
