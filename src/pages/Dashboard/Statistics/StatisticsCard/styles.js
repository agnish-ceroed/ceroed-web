import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    colors0: {
        color: '#0054a7',
        backgroundColor: '#9bccfd6b',
    },
    colors1: {
        backgroundColor: '#b8f1b091',
        color: '#0f7a00'
    },
    colors2: {
        backgroundColor: '#fffc8aa1',
        color: '#6b6800',
    },
    colors3: {
        backgroundColor: '#ff9776ba',
        color: '#a70000',
    },
    colors4: {
        backgroundColor: '#F9CEEE',
        color: '#970070',
    },
    colors5: {
        backgroundColor: '#F9F3EE',
    },
    colors6: {
        backgroundColor: '#F9CEEE',
    },
    colors7: {
        backgroundColor: '#F9EBC8',
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight:500,
        cursor: 'pointer',
    },
    valueContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    value: {
        fontSize: 36,
        fontWeight: 600,
    },
    name: {
        fontSize: 12,
    },
    cardComponent: {
        padding: '20px 0!important'
    }

}));

export default useStyles;
