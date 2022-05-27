import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getEmission } from "../../redux/actions";

import DashboardLayout from "../../layouts/DashboardLayout";
import PurchasedElectricityDetails from "./PurchasedElectricityDetails";
import MobileCombustionDetails from "./MobileCombustionDetails";
import StationaryCombustionDetails from "./StationaryCombustionDetails";
import RefrigerantsDetails from "./RefrigerantsDetails";
import WaterConsumptionDetails from "./WaterConsumptionDetails";
import WaterDischargeDetails from "./WaterDischargeDetails";
import WasteCombustionDetails from "./WasteCombustionDetails";
import TransportationDetails from "./Transportation";
import useStyles from "./styles";
import { rolesEnum } from "../../layouts/DashboardLayout/pages";
import CreateTicketDrawer from "../CreateTicketDrawer";

const EmissionsDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const emissionData = useSelector(
    (state) => state.emission.emissionDetails.data
  );
  const emissionDataStatus = useSelector(
    (state) => state.emission.emissionDetails.status
  );

  const userRole = useSelector(state => state.auth.userInfo.role);
  const isDeleteEnable = [rolesEnum.FACILITY_MANAGER, rolesEnum.BUSINESS_USER, rolesEnum.APPROVER].includes(userRole)

  const { type, id } = useParams();

  const onCancel = () => {
    navigate("/emissions/" + type);
  };

  useEffect(() => {
    type &&
      type &&
      dispatch(getEmission({ emissionType: type, emissionId: id }));
  }, [type, id, dispatch]);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        {emissionDataStatus === "running" ? (
          <div>Loading</div>
        ) : emissionDataStatus === "error" ? (
          <div>Something went wrong, reload again</div>
        ) : (
          <>
            {type === "purchased_electricity" && (
              <PurchasedElectricityDetails
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "mobile_combustion" && (
              <MobileCombustionDetails
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "stationary_combustion" && (
              <StationaryCombustionDetails
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "refrigerants" && (
              <RefrigerantsDetails
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "transportation" && (
              <TransportationDetails
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "water_consumption" && (
              <WaterConsumptionDetails
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "water_discharge" && (
              <WaterDischargeDetails
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "waste" && (
              <WasteCombustionDetails
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
          </>
        )}
      </Container>
      <CreateTicketDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} scope="emission" scopeId={id}/>
    </DashboardLayout>
  );
};

export default EmissionsDetails;
