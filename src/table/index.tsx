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

export interface IProps {
    columns: IColumn[];
    data: Array<INewPerson>;
    setData?: Dispatch<SetStateAction<INewPerson[]>>;
}

export interface SelectedItem {
    selected: number;
}

export interface HandleHeadCellClick {
    (type: string): (e: React.SyntheticEvent) => void;
}

export const Table = React.memo((props: IProps) => {
    const { data, columns } = props;
    const [pageNumber, setPageNumber] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [dataState, setDataState] = useState<
        undefined | { [key: string]: boolean | undefined }
    >();

    const setRowsHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setRowsPerPage(+e.currentTarget.value);
    };

    const handleHeadCellClick: HandleHeadCellClick = (type) => (_e) => {
        setDataState({
            [type]: dataState && !dataState[type],
        });
    };

    const pagesVisited = pageNumber * rowsPerPage;
    const pageData = data.slice(pagesVisited, pagesVisited + rowsPerPage);
    let dataToShow = pageData;
    if (dataState) {
        const sortableColumnName = Object.keys(dataState)[0];
        const direction = sortableColumnName && dataState[sortableColumnName] ? 1 : -1;
        dataToShow = pageData.sort((a, b) => {
            if (a[sortableColumnName] === b[sortableColumnName]) {
                return 0;
            }
            return a[sortableColumnName] > b[sortableColumnName] ? direction : direction * -1;
        });
    }

    const displayTH = (): Array<JSX.Element> =>
        columns.map((column) => (
            <th key={column.key} onClick={handleHeadCellClick(column.key)}>
                {column.title}
            </th>
        ));

    const displayRows = (): Array<JSX.Element> =>
        dataToShow.map((item) => (
            <tr key={item.id}>
                {columns.map((column) => {
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
            <button
                type="button"
                onClick={() => setDataState(undefined)}
                style={{
                    padding: '12px',
                    marginBottom: '20px',
                    border: '1px solid black',
                    fontSize: '14px',
                    background: 'white',
                    cursor: 'pointer',
                }}
                disabled={!dataState}
            >
                Reset sorting
            </button>
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
        </div>
    );
});
