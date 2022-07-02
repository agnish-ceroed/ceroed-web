import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import _ from "lodash";

import DashboardLayout from "../../layouts/DashboardLayout";
import CeroButton from "../../components/CeroButton";
import QuestionAndAnswer from "./QuestionAndAnswer";
import { rolesEnum } from "../../layouts/DashboardLayout/pages";

import { STATUS } from "../../redux/constants";
import { getAllQuestions, getCountryList } from "../../redux/actions";

import useStyles from "./styles";

const AccordionComponent = ({
  id,
  header,
  questions,
  classes,
  children,
  countryList,
  defaultExpanded,
  isAuditor,
}) => {
  return (
    <Accordion key={id} defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={id}
        classes={{
          root: children ? classes.accordionHeader : classes.secondaryHeader,
        }}
      >
        <Typography variant={children ? "h6" : "button"}>{header}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {questions && questions.length
          ? questions.map((question) => (
              <QuestionAndAnswer
                questionItem={question}
                key={question.id}
                countryList={countryList}
                isAuditor={isAuditor}
              />
            ))
          : ""}
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

const getChildComponent = (groupedQuestions, classes, countryList, isAuditor) => {
  let childComponent = [];
  for (let category in groupedQuestions) {
    const currentCategoryQuestions = _.groupBy(
      groupedQuestions[category],
      "sub_category_type"
    );
    let innerChildComponent = [];
    for (let subCategory in currentCategoryQuestions) {
      const currentSubCategoryQuestions = currentCategoryQuestions[subCategory];
      const subCategoryComponent = (
        <AccordionComponent
          key={subCategory}
          id={subCategory}
          header={currentSubCategoryQuestions[0].sub_category}
          questions={currentSubCategoryQuestions}
          classes={classes}
          countryList={countryList}
          isAuditor={isAuditor}
          defaultExpanded
        />
      );
      innerChildComponent.push(subCategoryComponent);
    }
    const categoryComponent = (
      <AccordionComponent
        key={category}
        id={category}
        header={groupedQuestions[category][0].category}
        classes={classes}
        children={innerChildComponent}
        defaultExpanded
      />
    );
    childComponent.push(categoryComponent);
  }
  return childComponent;
};

const QualitativeData = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, company } = useParams();
  const role = useSelector((state) => state.auth.role);
  const isAuditor = role === rolesEnum.AUDITOR;

  const questionsList = useSelector((state) => state.audit.questionsList.data);
  const questionsListStatus = useSelector(
    (state) => state.audit.questionsList.status
  );
  const countryListData = useSelector(
    (state) => state.listings.countryList.data
  );
  const countryList = countryListData.map((item) => ({
    id: item.code,
    label: item.name,
  }));

  const groupedQuestions = _.groupBy(questionsList, "category_type");
  const childComponent = getChildComponent(
    groupedQuestions,
    classes,
    countryList,
    isAuditor
  );

  useEffect(() => {
    dispatch(getAllQuestions({ id, isAuditor, company }));
  }, [dispatch, id, isAuditor, company]);

  useEffect(() => {
    dispatch(getCountryList());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Container className={classes.container}>
        <Box className={classes.headerContainer}>
          <Typography variant="h7" component="span">
            Qualitative data
          </Typography>
          <CeroButton
            buttonText="Back"
            className={classes.buttonSecondary}
            onClick={() => navigate(-1)}
          />
        </Box>
        {questionsListStatus === STATUS.SUCCESS ? (
          <Box className={classes.questionsListContainer}>{childComponent}</Box>
        ) : (
          <Box className={classes.loader}>
            <Typography variant="h7" component="span">
              {questionsListStatus === STATUS.RUNNING
                ? "Loading..."
                : questionsListStatus === STATUS.ERROR
                ? "Something went wrong. Please try again later"
                : ""}
            </Typography>
          </Box>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default QualitativeData;
