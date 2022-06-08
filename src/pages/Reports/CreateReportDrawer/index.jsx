import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";
import _ from "lodash";

import CeroInput from "../../../components/CeroInput";
import CeroSelect from "../../../components/CeroSelect";
import CeroAutoComplete from "../../../components/CeroAutoComplete";
import CeroSideSheetDrawer from "../../../components/CeroSideSheetDrawer";
import { sampleYear } from "../../../constants";
import { createReportValidation } from "./schema";

import {
  listFramework,
  listTopic,
  resetReportStatus,
  createReport,
} from "../../../redux/actions";
import { STATUS } from "../../../redux/constants";

import useStyles from "./styles";

const CreateReportDrawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { reportData, isOpen } = props;
  const frameworkList = useSelector(
    (state) => state.listings.frameworkList.data
  );
  const topicList = useSelector((state) => state.listings.topicList.data);
  const topicFetchStatus = useSelector((state) => state.listings.topicList.status);
  const createReportStatus = useSelector((state) => state.reports.createReport.status );

  const isButtonLoading = createReportStatus === STATUS.RUNNING;

  const frameworkOptionList = frameworkList.map((item) => ({
    key: item.id,
    value: item.name,
  }));
  const topicOptionList = topicList.map((item) => ({
    id: item.id,
    label: item.name,
  }));
  const yearList = sampleYear.map((item) => ({
    id: item.key,
    label: item.value,
  }));

  const getReportTopic = (data = []) =>
    data.map((item) => {
      const innerItem = topicOptionList.find((inner) => inner.id === item);
      return _.isEmpty(innerItem) ? { id: item, label: item } : innerItem;
    });

  const createReportForm = useFormik({
    initialValues: {
      name: reportData ? reportData.name : "",
      year: reportData ? dayjs(reportData.created_ts).get("year") : "",
      framework: reportData ? reportData.framework_id : "",
      topic: reportData ? getReportTopic(reportData.topics) : topicOptionList,
    },
    validationSchema: createReportValidation,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const onSubmitReportData = () => {
    const payload = {
      framework_id: createReportForm.values.framework,
      name: createReportForm.values.name,
      year: createReportForm.values.year,
      topic_id: (createReportForm.values.topic || []).map((item) => item.id),
    };
    dispatch(createReport(payload));
  };
  const onClose = useCallback(() => {
    createReportForm.resetForm();
    props.onClose();
  }, [createReportForm, props]);

  useEffect(() => {
    if (createReportStatus === STATUS.SUCCESS) {
      enqueueSnackbar("Report created successfully", { variant: "success" });
      dispatch(resetReportStatus());
      onClose();
    } else if (createReportStatus === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
      dispatch(resetReportStatus());
    }
  }, [createReportStatus, enqueueSnackbar, onClose, dispatch]);

  useEffect(() => {
    dispatch(listFramework());
    dispatch(listTopic());
  }, [dispatch]);

  useEffect(() => {
    if(topicFetchStatus === STATUS.SUCCESS) {
      createReportForm.setFieldValue('topic_id', topicOptionList);
    }
  }, [topicFetchStatus]);

  const getPrimaryPaymentDrawer = () => {
    return (
      <Box className={classes.mainContainer}>
        <CeroInput
          required
          id="name"
          name="name"
          label="Report Name"
          fullWidth
          value={createReportForm.values.name}
          onChange={createReportForm.handleChange}
          onBlur={createReportForm.handleBlur}
          error={createReportForm.touched.year && createReportForm.errors.name}
        />
        <CeroSelect
          classes={{ container: classes.selectContainer }}
          required
          id="framework"
          name="framework"
          label="Framework"
          fullWidth
          options={frameworkOptionList}
          selectedValue={createReportForm.values.framework}
          onChange={createReportForm.handleChange}
          onBlur={createReportForm.handleBlur}
          error={
            createReportForm.touched.year && createReportForm.errors.framework
          }
        />
        <CeroAutoComplete
          required
          id="year"
          name="year"
          label="Year"
          fullWidth
          options={yearList}
          value={createReportForm.values.year}
          onChange={(e, value) => {
            createReportForm.setFieldValue("year", value.id);
          }}
          onBlur={createReportForm.handleBlur}
          error={createReportForm.touched.year && createReportForm.errors.year}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
        <CeroAutoComplete
          classes={{ container: classes.selectContainer }}
          required
          id="topic"
          name="topic"
          label="Topic"
          fullWidth
          options={topicOptionList}
          value={createReportForm.values.topic}
          onChange={(e, value) => {
            createReportForm.setFieldValue("topic", value);
          }}
          onBlur={createReportForm.handleBlur}
          multiple
          error={
            createReportForm.touched.topic && createReportForm.errors.topic
          }
        />
      </Box>
    );
  };

  return (
    <CeroSideSheetDrawer
      primaryDrawer={{
        drawerOpen: isOpen,
        onClose: onClose,
        content: getPrimaryPaymentDrawer(),
        header: { title: "Create report" },
        footer: {
          primaryBtnTitle: isButtonLoading ? "Saving..." : "Save",
          secondaryBtnTitle: "Cancel",
          primaryBtnAction: onSubmitReportData,
          secondaryBtnAction: onClose,
          disablePrimaryBtn:
            !createReportForm.dirty ||
            !createReportForm.isValid ||
            isButtonLoading,
        },
        classes: {
          drawerContainer: classes.drawerContainer,
          contentArea: classes.drawerContentArea,
        },
      }}
    />
  );
};

export default CreateReportDrawer;
