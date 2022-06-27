import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    questionItemContainer: {
        paddingTop: theme.spacing(4),
    },
    questionContainer: {
        display: 'flex',
        alignItems: 'baseline',
    },
    number:{
        marginRight: theme.spacing(2),
        fontWeight: 500,
    },
    question:{
        fontWeight: 500,
    },
    answerContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    answer:{
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(4),
    },
    link:{
        fontSize: 12,
        color: theme.palette.text.accent,
        marginLeft: theme.spacing(4),
        cursor: 'pointer'
    },
    answerArea: {
        padding: theme.spacing(0,4,4),
        width: '100%',
        borderBottom: `1px solid ${theme.palette.border.gray}`,
        display: 'flex',
        flexDirection: 'column',
    },
    answerAreaContainer: {
        minHeight: 50,
    },
    buttonContainer: {
        width: '50%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        width: 105,
        height: 25,
        fontSize: 10,
    },
    buttonPrimary: {
        backgroundColor: theme.palette.text.accent,
    },
    buttonSecondary: {
        color: theme.palette.text.accent,
        marginRight: theme.spacing(5),
    },
    textArea: {
        height: "auto!important",
        width: '50%'
    },
    dropdownContainer: {
        maxWidth: "50%",
    },
    editIcon: {
        fontSize: 14
    }
}));

export default useStyles;