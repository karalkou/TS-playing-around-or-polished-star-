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
  return (
    <div>
      <Search onSearch={value => console.log(value)} />
      <StyledTable>
        <thead>
          <tr>
            {props.columns.map(column => (
              <th>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map(item => (
            <tr>
              {props.columns.map(column => (
                <td>
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
