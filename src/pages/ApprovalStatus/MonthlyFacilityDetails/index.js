import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography } from '@mui/material';
import _ from 'lodash';
import DashboardLayout from '../../../layouts/DashboardLayout';
import CeroTable from '../../../components/CeroTable';
import {
  getApprovalMonthlyDetails,
  getApprovalMonthlySummary
} from '../../../redux/actions';
import Header from './Header';
import Status from './Status';

import useStyles from './styles';

const MonthlyFacilityDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const facilitiesData = useSelector(
    (state) => state.listings.listFacilities.data
  );
  const approvalMonthlyData = useSelector(
    (state) => state.approval.approvalMonthlyDetails.data
  );
  const approvalSummaryData = useSelector(
    (state) => state.approval.approvalMonthlySummary.data
  );

  const approvalData = approvalMonthlyData?.response;
  const stationaryCombustionData = (approvalData || []).filter(
    (item) => item.type === 'stationary_combustion'
  );
  const mobileCombustionData = (approvalData || []).filter(
    (item) => item.type === 'mobile_combustion'
  );
  const refrigerantsCombustionData = (approvalData || []).filter(
    (item) => item.type === 'refrigerants'
  );
  const transportationCombustionData = (approvalData || []).filter(
    (item) => item.type === 'transportation'
  );
  const waterDischargeCombustionData = (approvalData || []).filter(
    (item) => item.type === 'water_discharge'
  );
  const waterConsumptionCombustionData = (approvalData || []).filter(
    (item) => item.type === 'water_consumption'
  );
  const wasteCombustionData = (approvalData || []).filter(
    (item) => item.type === 'waste'
  );
  const purchasedElectricityCombustionData = (approvalData || []).filter(
    (item) => item.type === 'purchased_electricity'
  );
  const generalEmissionData = (approvalData || []).filter(
    (item) =>
      item.type !== 'stationary_combustion' &&
      item.type !== 'mobile_combustion' &&
      item.type !== 'refrigerants' &&
      item.type !== 'transportation' &&
      item.type !== 'water_discharge' &&
      item.type !== 'water_consumption' &&
      item.type !== 'waste' &&
      item.type !== 'purchased_electricity'
  );

  const energyAndMaterialsData = [
    ...stationaryCombustionData,
    ...mobileCombustionData,
    ...purchasedElectricityCombustionData,
    ...refrigerantsCombustionData,
    ...transportationCombustionData
  ];
  const waterData = [
    ...waterDischargeCombustionData,
    ...waterConsumptionCombustionData,
    ...wasteCombustionData
  ];

  const facilitiesList = facilitiesData.map((item) => ({
    key: item.id,
    value: item.name
  }));

  const { year } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const selectedMonth = queryParams.get('month');
  const selectedFacility = queryParams.get('facility');
  const selectedId = queryParams.get('id');

  const onSelectData = (row) => {
    navigate(
      `/emissions/${row.type}${year && `?year=${year}`}${
        selectedMonth ? `&month=${selectedMonth}` : ''
      }${selectedFacility ? `&facility=${selectedFacility}` : ''}`
    );
  };

  useEffect(() => {
    dispatch(
      getApprovalMonthlyDetails(
        selectedId,
        year,
        selectedMonth,
        selectedFacility
      )
    );
    dispatch(
      getApprovalMonthlySummary(
        selectedId,
        year,
        selectedMonth,
        selectedFacility
      )
    );
  }, [dispatch, selectedId, year, selectedMonth, selectedFacility]);

  const combustionSummaryColumns = [
    {
      columnKey: 'sector',
      columnId: 'sector',
      columnHeader: 'Topics',
      classes: { column: classes.cellContainer }
    },
    {
      columnKey: 'total_co2',
      columnId: 'total_co2',
      columnHeader: 'CO2 (tonnes)',
      classes: { column: classes.cellContainer }
    },
    {
      columnKey: 'total_ch4',
      columnId: 'total_ch4',
      columnHeader: 'CH4 (tonnes)',
      classes: { column: classes.cellContainer }
    },
    {
      columnKey: 'total_n2o',
      columnId: 'total_n2o',
      columnHeader: 'N2O (tonnes)',
      classes: { column: classes.cellContainer }
    },
    {
      columnKey: 'total_co2e',
      columnId: 'total_co2e',
      columnHeader: 'CO2e (tonnes)',
      classes: { column: classes.cellContainer }
    }
  ];

  const waterSummaryColumns = [
    {
      columnKey: 'sector',
      columnId: 'sector',
      columnHeader: 'Topics',
      classes: { column: classes.cellContainer }
    },
    {
      columnKey: 'usage',
      columnId: 'usage',
      columnHeader: 'Usage',
      classes: { column: classes.cellContainer }
    },
    {
      columnKey: 'records',
      columnId: 'records',
      columnHeader: 'No or records',
      classes: { column: classes.cellContainer }
    }
  ];

  const generalColumnConfig = [
    {
      columnKey: 'sector',
      columnId: 'sector',
      columnHeader: 'Topics',
      classes: { column: classes.generalCellContainer }
    },
    {
      columnKey: 'detailsColumn',
      columnId: 'detailsColumn',
      columnHeader: 'Details',
      classes: { column: classes.cellContainer }
    }
  ];

  const onApplyFilter = (filter) => {
    const currentFilter = encodeURI(
      `?${filter.month ? `&month=${filter.month}` : ''}${
        filter.facility ? `&facility=${filter.facility}` : ''
      }`
    );
    navigate(`/approval-status/${filter.year}${currentFilter}`);
  };

  const getWaterData = (data) =>
    data.map((item) => ({
      ...item,
      usage: `${item.usage} ${item.unit}`
    }));

  const summaryData = _.groupBy(generalEmissionData, 'topic');
  const topicKeys = _.keys(summaryData);

  const getData = (columnData) => {
    if (columnData.type === 'development_training') {
      return `Attended: ${columnData.attended}, Hours: ${columnData.hours}`;
    } else if (
      columnData.type === 'employee_health_safety_incident_record' ||
      columnData.type === 'discrimination_incident_record'
    ) {
      return `Affected: ${columnData.affected}`;
    } else if (
      columnData.type === 'worker_safety_training_procedures' ||
      columnData.type === 'operational_human_rights_training' ||
      columnData.type === 'anti_corruption_training' ||
      columnData.type === 'social_engagement_human_rights_training'
    ) {
      return `Attended: ${columnData.attended}`;
    } else if (
      columnData.type === 'political_contributions' ||
      columnData.type === 'subsidies_financial_assistance'
    ) {
      return `Amount: ${columnData.amount}`;
    } else return `Records: ${columnData.records}`;
  };

  const getGeneralTableData = (data) =>
    data.map((item) => ({
      ...item,
      detailsColumn: getData(item)
    }));

  const getGeneralTable = () => {
    return topicKeys.map((topic) => {
      return (
        <Container className={classes.tableContainer} key={topic}>
          <Typography
            variant='h7'
            component='div'
            className={classes.tableHeaderContainer}
          >
            {topic}
          </Typography>
          <CeroTable
            columns={generalColumnConfig}
            data={getGeneralTableData(summaryData[topic]) || []}
            hasMore={false}
            loading={false}
            onSelectRow={onSelectData}
          />
        </Container>
      );
    });
  };

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Header
          approveId={selectedId}
          onApplyFilter={onApplyFilter}
          selectedYear={year}
          selectedMonth={selectedMonth}
          selectedFacility={selectedFacility}
          facilitiesList={facilitiesList}
          actions={approvalMonthlyData?.actions}
          statusId={approvalMonthlyData?.monthly_approval_status_id}
        />
        {approvalSummaryData.assigned_auditor_id && (
          <Status
            status={approvalSummaryData.status}
            approvedBy={approvalSummaryData.approved_by_name}
            auditStatus={approvalSummaryData.audited_status}
            noOfTickets={approvalSummaryData.open_tickets}
            auditorAssigned={approvalSummaryData.assigned_to_name}
            auditorStatus={approvalSummaryData.audited_status}
            actions={approvalMonthlyData?.actions}
          />
        )}
        {!!energyAndMaterialsData.length && (
          <Container className={classes.tableContainer}>
            <Typography
              variant='h7'
              component='div'
              className={classes.tableHeaderContainer}
            >
              {energyAndMaterialsData[0].topic}
            </Typography>
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
            <Typography
              variant='h7'
              component='div'
              className={classes.tableHeaderContainer}
            >
              {waterData[0].topic}
            </Typography>
            <CeroTable
              columns={waterSummaryColumns}
              data={getWaterData(waterData)}
              hasMore={false}
              loading={false}
              onSelectRow={onSelectData}
            />
          </Container>
        )}
        {!!generalEmissionData.length && getGeneralTable()}
      </Container>
    </DashboardLayout>
  );
};

export default MonthlyFacilityDetails;
