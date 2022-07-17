import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import { clearEmissionList, getEmissionList } from "../../redux/actions";
import { sampleYear } from "../../constants";
import { rolesEnum } from "../../layouts/DashboardLayout/pages";
import EmissionTable from "./EmissionTable";
import EmissionHeader from "./EmissionHeader";
import useStyles from "./styles";
import { Typography } from '@mui/material';

const savedPage = {
  // To be used from the api response
  pageNumber: 1,
};

const DEFAULT_ITEMS_PER_PAGE = 20;

const EmissionList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const { type } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const selectedMonth = queryParams.get("month");
  const selectedFacility = queryParams.get("facility");
  const selectedYear = queryParams.get("year");
  const company = queryParams.get("company");

  const emissionData = useSelector((state) => state.emission.emissionList.data);
  const emissionDataStatus = useSelector((state) => state.emission.emissionList.status);
  const role = useSelector((state) => state.auth.role);
  const isAuditor = role === rolesEnum.AUDITOR;

  const emissionType = type;

  const [filter, setFilter] = useState({
    month: selectedMonth,
    year: selectedYear || sampleYear[0].key,
    facility_id: selectedFacility,
  });

  useEffect(() => {
    !emissionType
      ? navigate("stationary_combustion")
      : onLoadMore(DEFAULT_ITEMS_PER_PAGE, 1);
    return () => {
      clearEmissionList();
    };
  }, [emissionType]);

  useEffect(() => {
    onLoadMore(DEFAULT_ITEMS_PER_PAGE, 1);
    return () => {
      clearEmissionList();
    };
  }, [filter]);

  const onLoadMore = (limit = DEFAULT_ITEMS_PER_PAGE, pageNumber) => {
    const filterRequest = {
      limit,
      skip: ((pageNumber || (savedPage.pageNumber || 0) + 1) - 1) * limit,
      ...filter,
    };
    if(!filterRequest.facility_id) {
      delete filterRequest.facility_id;
    }
    dispatch(getEmissionList(emissionType, filterRequest, isAuditor, company));
  };

  const onApplyFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Typography variant='h6' component='span'>
          Topics
        </Typography>
        <EmissionHeader
          onApplyFilter={onApplyFilter}
          onAddData={() => navigate(`/emissions/add/${emissionType}`)}
          emissionType={emissionType || 'stationary_combustion'}
          setEmissionType={(type) => navigate(`/emissions/${type}`)}
          filter={filter}
          isDisabled={isAuditor}
        />
        <EmissionTable
          emissionData={emissionData}
          dataStatus={emissionDataStatus}
          onLoadMore={onLoadMore}
          emissionType={emissionType}
          isAuditor={isAuditor}
          company={company}
        />
      </Container>
    </DashboardLayout>
  );
};

export default EmissionList;
