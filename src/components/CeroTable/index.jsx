import React from 'react';
import {
  Table, TableCell, TableHead, TableRow, TableBody, TableContainer, TableFooter, CircularProgress,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';
import useStyles from './styles';

const CeroTable = (props) => {
  const classes = useStyles();
  const tableId = `CeroTable-${props.tableId || 'table-id'}`;

  const getHeaders = () => props.columns.map((column, index) => (
    <TableCell className={clsx(classes.headerCell, column.classes?.header)} key={column.columnId || index} align={column.align}>
      { column.columnHeader }
    </TableCell>
  ));

  const getTableRows = () => props.data.map((rowData, rowIndex) => (
    <TableRow
      key={rowData.id}
      className={clsx(
        classes.tableDataRow, props.classes?.tableDataRow,
        rowData.selected && classes.tableSelectedRow,
        props.isSelectable && classes.selectableTableRow,
      )}
      onClick={() => props.onSelectRow(rowData)}
    >
      { props.columns.map((column, columnIndex) => (
        <TableCell
          key={`${rowData.id || rowIndex}-${column.columnId || columnIndex}`}
          className={clsx(classes.tableBodyCell, column.classes?.column)}
          align={column.align}
        >
          { rowData[column.columnKey]}
        </TableCell>
      ))}
    </TableRow>
  ));

  return (
    <InfiniteScroll
      dataLength={props.data.length}
      hasMore={!!props.hasMore}
      next={props.loadMore}
      scrollableTarget={tableId}
      loader={<></>}
    >
      <TableContainer id={tableId} className={clsx(classes.tableContainer, props.classes?.tableContainer)}>
        <Table stickyHeader>
          <TableHead>
            <TableRow className={clsx(classes?.tableHeader, props.classes?.tableHeader)}>
              { getHeaders() }
            </TableRow>
          </TableHead>
          <TableBody className={props.classes?.tableBody}>
            { getTableRows() }
          </TableBody>
          { props.loading && (
            <TableFooter className={classes.tableFooter}>
              <TableRow>
                <TableCell variant="footer" colSpan={props.columns.length} className={classes.footerCell}>
                  <CircularProgress thickness={3} size={20} className={classes.progress} />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );
};
export default CeroTable;
