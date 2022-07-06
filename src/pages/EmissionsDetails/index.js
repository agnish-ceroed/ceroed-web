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
import DevelopmentAndTraining from "./DevelopmentAndTraining";
import EmployeeHealthSafety from "./EmployeeHealthSafety";
import WorkerSafetyTraining from "./WorkerSafetyTraining";
import EmployeeTurnover from "./EmployeeTurnover";
import AgeBasedStatistics from "./AgeBasedStatistics";
import GenderBasedStatistics from "./GenderBasedStatistics";
import DiscriminationIncident from "./DiscriminationIncident";
import SupplierScreening from "./SupplierScreening";
import OperationalHumanRightsTraining from "./OperationalHumanRightsTraining";
import SocialEngagementHumanRightsTraining from "./SocialEngagementHumanRightsTraining";
import LocalCommunities from "./LocalCommunities";
import PoliticalContributions from "./PoliticalContributions";
import AntiCorruptionDisclosure from "./AntiCorruptionDisclosure";
import AntiCorruptionTraining from "./AntiCorruptionTraining";
import AntiCompetitiveDisclosure from "./AntiCompetitiveDisclosure";
import SubsidiesFinancialAssistance from "./SubsidiesFinancialAssistance";
import Tax from "./Tax";
import { rolesEnum } from "../../layouts/DashboardLayout/pages";
import CreateTicketDrawer from "../common/CreateTicketDrawer";
import useStyles from "./styles";

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
            {type === "development_training" && (
              <DevelopmentAndTraining
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "employee_health_safety_incident_record" && (
              <EmployeeHealthSafety
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "worker_safety_training_procedures" && (
              <WorkerSafetyTraining
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "employees_turnover" && (
              <EmployeeTurnover
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "age_based_statistics" && (
              <AgeBasedStatistics
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "gender_based_statistics" && (
              <GenderBasedStatistics
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "discrimination_incident_record" && (
              <DiscriminationIncident
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "supplier_screening" && (
              <SupplierScreening
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "operational_human_rights_training" && (
              <OperationalHumanRightsTraining
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "social_engagement_human_rights_training" && (
              <SocialEngagementHumanRightsTraining
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "local_communities" && (
              <LocalCommunities
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "political_contributions" && (
              <PoliticalContributions
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "anti_corruption_disclosure" && (
              <AntiCorruptionDisclosure
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "anti_corruption_training" && (
              <AntiCorruptionTraining
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "anti_competitive_disclosure" && (
              <AntiCompetitiveDisclosure
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "subsidies_financial_assistance" && (
              <SubsidiesFinancialAssistance
                onCancel={onCancel}
                emissionId={id}
                emissionData={emissionData}
                isDeleteEnable={isDeleteEnable}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            )}
            {type === "tax" && (
              <Tax
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
