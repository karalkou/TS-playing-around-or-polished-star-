import * as React from "react";

import { StyledTable } from "./styled";
import { Search } from "./search";

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

  return (
    <div>
      <Search onSearch={value => console.log(value)} />
      <StyledTable>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {columns.map(column => (
                <td key={column.key}>
                  {column.render
                    ? column.render(item[column.key])
                    : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
});
