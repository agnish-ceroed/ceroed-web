import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Typography, IconButton, Tooltip, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";

import CeroButton from "../../../components/CeroButton";
import CeroInput from "../../../components/CeroInput";
import CeroDropdown from "../../../components/CeroDropdown";
import CeroAutoComplete from "../../../components/CeroAutoComplete";

import { STATUS } from "../../../redux/constants";
import { answerQualitativeQuestion } from "../../../redux/actions";

import useStyles from "./styles";

const AnswerArea = ({ questionItem, classes, onCancel, countryList }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const questionAnswerStatus = useSelector(
    (state) => state.audit.answerQuestion.status
  );

  const { question_type, lookup_field, keys } = questionItem;
  const isMultiple = question_type === "multiselect";
  const defaultValue =
    isMultiple && questionItem.answer
      ? questionItem.answer.split(",").map((item) => ({ label: item }))
      : "";
  const [answer, setAnswer] = useState(
    questionItem.answer
      ? defaultValue
        ? defaultValue
        : questionItem.answer
      : isMultiple
      ? []
      : ""
  );
  const isLoading = questionAnswerStatus === STATUS.RUNNING;

  const onUpdateAnswer = () => {
    const payload = {
      question_id: questionItem.id,
      answer: isMultiple ? answer.map((item) => item.label).join(",") : answer,
      audit_status_id: id,
    };
    if (questionItem.answer_id) payload.answer_id = questionItem.answer_id;
    dispatch(answerQualitativeQuestion(payload));
  };

  useEffect(() => {
    if (questionAnswerStatus === STATUS.SUCCESS) {
      enqueueSnackbar("Answer updated successfully", { variant: "success" });
      onCancel();
    } else if (questionAnswerStatus === STATUS.ERROR) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }, [questionAnswerStatus, dispatch, enqueueSnackbar, onCancel]);

  return (
    <Box className={classes.answerArea}>
      <Box className={classes.answerAreaContainer}>
        {question_type === "text" && (
          <CeroInput
            classes={{ container: classes.textArea }}
            rows={3}
            multiline
            id="answer"
            name="answer"
            placeholder="Please type your answer"
            value={answer}
            fullWidth
            onChange={({ target }) => setAnswer(target.value)}
            disabled={isLoading}
          />
        )}
        {question_type === "dropdown" && !lookup_field && (
          <CeroDropdown
            id="answer"
            label="Answer"
            options={keys.split(",").map((key) => ({
              key,
              value: key,
            }))}
            onChange={({ target }) => setAnswer(target.value)}
            selectedValue={answer}
            disabled={isLoading}
            classes={{ container: classes.dropdownContainer }}
          />
        )}
        {question_type === "dropdown" && lookup_field && (
          <Box className={classes.dropdownContainer}>
            <CeroAutoComplete
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              options={countryList}
              value={answer || ""}
              onChange={(e, value) => setAnswer(value?.label)}
              isOptionEqualToValue={(option, value) => option.label === value}
            />
          </Box>
        )}
        {isMultiple && lookup_field && (
          <Box className={classes.dropdownContainer}>
            <CeroAutoComplete
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              options={countryList}
              value={answer || ""}
              onChange={(e, value) => setAnswer(value)}
              isOptionEqualToValue={(option, value) => option.label === value}
              multiple
            />
          </Box>
        )}
      </Box>
      <Box className={classes.buttonContainer}>
        <CeroButton
          buttonText="Cancel"
          variant="outlined"
          className={clsx(classes.button, classes.buttonSecondary)}
          onClick={onCancel}
          disabled={isLoading}
        />
        <CeroButton
          buttonText={isLoading ? "Saving..." : "Save answer"}
          className={clsx(classes.button, classes.buttonPrimary)}
          onClick={onUpdateAnswer}
          disabled={isLoading || !answer}
        />
      </Box>
    </Box>
  );
};

const QuestionAndAnswer = ({ questionItem, countryList, isAuditor }) => {
  const classes = useStyles();
  const [isAnswerEnabled, setIsAnswerEnabled] = useState(false);

  return (
    <Box className={classes.questionItemContainer}>
      <Box className={classes.questionContainer}>
        <Box className={classes.number}>
          {questionItem.question_no_label
            ? `${questionItem.question_no_label}.`
            : ""}
        </Box>
        <Box className={classes.question}>{questionItem.question}</Box>
      </Box>
      <Box className={classes.answerContainer}>
        {isAnswerEnabled ? (
          <AnswerArea
            questionItem={questionItem}
            classes={classes}
            countryList={countryList}
            onCancel={() => setIsAnswerEnabled(false)}
          />
        ) : (
          questionItem.question_type !== "label" && (
            <Box className={classes.answer}>
              {questionItem.answer_flag ? (
                <Box>
                  {questionItem.answer || "--"}
                  {!isAuditor && (
                    <Tooltip
                      title={"Edit answer"}
                      placement="right"
                      arrow
                      TransitionComponent={Zoom}
                    >
                      <IconButton
                        className={classes.editIcon}
                        onClick={() => setIsAnswerEnabled(true)}
                        size="small"
                      >
                        <EditIcon
                          fontSize="small"
                          color="primary"
                          className={classes.editIcon}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              ) : (
                "--"
              )}
              {!questionItem.answer_flag && !isAuditor && (
                <Typography
                  sx={{ textDecoration: "underline" }}
                  display="inline"
                  className={classes.link}
                  onClick={() => setIsAnswerEnabled(true)}
                >
                  Answer now
                </Typography>
              )}
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default QuestionAndAnswer;
