import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import { clearEmissionList, getEmissionList } from "../../redux/actions";
import EmissionTable from "./EmissionTable";
import EmissionHeader from "./EmissionHeader";
import useStyles from "./styles";
import _ from "lodash";

const savedPage = {
  // To be used from the api response
  pageNumber: 1,
};

const DEFAULT_ITEMS_PER_PAGE = 20;

const EmissionList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const { filters, type } = useParams();
  const emissionData = useSelector((state) => state.emission.emissionList.data);
  const emissionType = type;
  let initialFilter = {};
  if (!_.isEmpty(filters)) {
    const filterArr = filters.split("&");
    _.forEach(filterArr, (item) => {
      const [key, value] = item.split("-");
      initialFilter[key] = value;
    });
  }
  const [filter, setFilter] = useState(initialFilter);

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
    dispatch(getEmissionList(emissionType, filterRequest));
  };

  const onApplyFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <EmissionHeader
          onApplyFilter={onApplyFilter}
          onAddData={() => navigate(`/emissions/add/${emissionType}`)}
          emissionType={emissionType || "stationary_combustion"}
          setEmissionType={(type) => navigate(`/emissions/${type}`)}
          filter={filter}
        />
        <EmissionTable
          emissionData={emissionData}
          onLoadMore={onLoadMore}
          emissionType={emissionType}
        />
      </Container>
    </DashboardLayout>
  );
};

export default EmissionList;
