import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: 500,
  },
  tableHeader: {
    height: 35,
  },
  headerCell: {
    height: 36,
    fontSize: 14,
    fontWeight: 500,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.Other.background,
    '&:first-child': {
      paddingLeft: theme.spacing(4),
    },
    '&:last-child': {
      paddingRight: theme.spacing(4),
    },
  },
  tableDataRow: {
    height: 52,
    backgroundColor: theme.palette.Primary.contrastText,
    boxShadow: 'inset 0px -1px 0px rgba(80, 80, 80, 0.15)',
    '&:hover': {
      backgroundColor: theme.palette.Other.background,
    },
  },
  selectableTableRow: {
    cursor: 'pointer',
  },
  tableSelectedRow: {
    backgroundColor: theme.palette.Primary.background,
    '&:hover': {
      backgroundColor: '#FFDED2', // TODO: add to the theme once it is available
    },
  },
  tableBodyCell: {
    fontSize: 14,
    fontWeight: 400,
    padding: theme.spacing(1),
    boxShadow: 'inset 0px -1px 0px rgba(80, 80, 80, 0.15)',
    '&:first-child': {
      paddingLeft: theme.spacing(4),
    },
    '&:last-child': {
      paddingRight: theme.spacing(4),
    },
  },
  progress: {
    color: theme.palette.Warning.main,
  },
  footerCell: {
    textAlign: 'center',
    padding: theme.spacing(3),
    boxShadow: 'inset 0px -1px 0px rgba(80, 80, 80, 0.15)',
  },
  tableFooter: {
    height: 52,
    backgroundColor: theme.palette.Primary.contrastText,
  },
  noDataWarning: {
    position: 'absolute',
    textAlign: 'center',
    width: '75%'
  }
}));
export default useStyles;