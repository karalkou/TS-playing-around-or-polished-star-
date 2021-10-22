import * as React from "react";
import ReactPaginate from "react-paginate";

import { Search } from "./search";
import { StyledTable, StyledPaginateContainer } from "./styled";

export type IValue = any;

export interface IColumn {
  key: string;
  title: string;
  render?: (value: IValue) => IValue;
}

interface IProps {
  columns: IColumn[];
  data: { [key: string]: IValue }[];
}

export const Table = React.memo((props: IProps) => {
  const { data, columns } = props;
  const [pageNumber, setPageNumber] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const setRowsHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setRowsPerPage(+e.currentTarget.value);
  }

  const pagesVisited = pageNumber * rowsPerPage;

  const displayTH = () => (
      columns.map(column => (
        <th key={column.key}>{column.title}</th>
      ))
    )
  
  const displayRows = () => data
    .slice(pagesVisited, pagesVisited + rowsPerPage)
    .map(item => (
      <tr key={item.id}>
        {columns.map(column => (
          <td key={column.key}>
            {column.render
              ? column.render(item[column.key])
              : item[column.key]}
          </td>
        ))}
      </tr>
    ));

  const pageCount = Math.ceil(data.length / rowsPerPage)

  const handleChangePage = ({ selected }: any) => {
    setPageNumber(selected)
  }

  return (
    <div>
      <Search onSearch={value => console.log(value)} />
      <div style={{marginBottom: '20px'}}>
        Results per page:&nbsp;
        <select value={rowsPerPage} onChange={setRowsHandler}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      {
        !!rowsPerPage && (
          <>
            <StyledTable>
              <thead>
                <tr>{displayTH()}</tr>
              </thead>
              <tbody>
                {displayRows()}
              </tbody>
          </StyledTable>
          <StyledPaginateContainer>
              <ReactPaginate 
                previousLabel='Prev'
                nextLabel='Next'
                pageCount={pageCount}
                pageRangeDisplayed={pageCount}
                marginPagesDisplayed={2}
                onPageChange={handleChangePage}
                containerClassName='paginationList'
                pageClassName='paginationListItem'
                previousLinkClassName='prevBtn'
                nextLinkClassName='nextBtn'
                disabledClassName='disabled'
                activeLinkClassName='active'
              />
            </StyledPaginateContainer>
          </>
        )
      }
    </div>
  );
});
