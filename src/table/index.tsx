import React, { SetStateAction, useState, Dispatch } from 'react';
import ReactPaginate from 'react-paginate';

import { INewPerson } from '../create-data';

import { Search } from './search';
import { StyledTable, StyledPaginateContainer } from './styled';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IValue = any;

export interface IColumn {
    key: string;
    title: string;
    render?: (value: Array<string>) => string;
}

interface IProps {
    columns: IColumn[];
    data: Array<INewPerson>;
    setData: Dispatch<SetStateAction<INewPerson[]>>;
}

export interface SelectedItem {
    selected: number;
}

export interface HandleHeadCellClick {
    (column: IColumn): (e: React.SyntheticEvent) => void;
}

export const Table = React.memo((props: IProps) => {
    const { data, columns, setData } = props;
    const [pageNumber, setPageNumber] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // { age: true, name: true };
    // or { [key]: true|false }
    const [dataState, setDataState] = useState<undefined | { [key: string]: boolean }>();
    console.log('dataState: ', dataState);
    // const handleSortClick = (key: string): void =>
    //     setDataState({ [key]: dataState && dataState[key] ? !dataState[key] : true });

    const setRowsHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setRowsPerPage(+e.currentTarget.value);
    };

    const handleHeadCellClick: HandleHeadCellClick = (column) => (_e) => {
        console.log('column.key: ', column.key);
        setDataState({
            [column.key]: dataState && dataState[column.key] ? !dataState[column.key] : true,
        });
    };

    const pagesVisited = pageNumber * rowsPerPage;
    const pageData = data.slice(pagesVisited, pagesVisited + rowsPerPage);
    const sortableColumnName = dataState && Object.keys(dataState)[0];
    console.log('sortablebleColsName: ', sortableColumnName);
    const dataToShow = dataState
        ? pageData.sort((a, b) => {
              if (sortableColumnName && a[sortableColumnName] < b[sortableColumnName]) {
                  return -1;
              }
              if (sortableColumnName && a[sortableColumnName] > b[sortableColumnName]) {
                  return 1;
              }
              return 0;
          })
        : pageData;
    console.log(dataToShow);

    const displayTH = (): Array<JSX.Element> =>
        columns.map((column) => (
            <th key={column.key} onClick={handleHeadCellClick(column)}>
                {column.title}
            </th>
        ));

    const displayRows = (): Array<JSX.Element> =>
        dataToShow.map((item) => (
            <tr key={item.id}>
                {columns.map((column) => {
                    // console.log('column: ', column);
                    // console.log('item[column.key]: ', item[column.key]);
                    return (
                        <td key={column.key}>
                            {column.render ? column.render(item[column.key]) : item[column.key]}
                        </td>
                    );
                })}
            </tr>
        ));

    const pageCount = Math.ceil(data.length / rowsPerPage);

    const handleChangePage = ({ selected }: SelectedItem): void => {
        setPageNumber(selected);
    };

    return (
        <div>
            <Search onSearch={(value) => console.log(value)} />
            <div style={{ marginBottom: '20px' }}>
                Results per page:&nbsp;
                <select value={rowsPerPage} onChange={setRowsHandler}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            {!!rowsPerPage && (
                <>
                    <StyledTable>
                        <thead>
                            <tr>{displayTH()}</tr>
                        </thead>
                        <tbody>{displayRows()}</tbody>
                    </StyledTable>
                    <StyledPaginateContainer>
                        <ReactPaginate
                            previousLabel="Prev"
                            nextLabel="Next"
                            pageCount={pageCount}
                            pageRangeDisplayed={pageCount}
                            marginPagesDisplayed={2}
                            onPageChange={handleChangePage}
                            containerClassName="paginationList"
                            pageClassName="paginationListItem"
                            previousLinkClassName="prevBtn"
                            nextLinkClassName="nextBtn"
                            disabledClassName="disabled"
                            activeLinkClassName="active"
                        />
                    </StyledPaginateContainer>
                </>
            )}
            {/* <button type="button" onClick={handleSortClick}>
                push me
            </button> */}
        </div>
    );
});
