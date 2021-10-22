import * as React from "react";

import { StyledInput } from './styled'

interface IProps {
  onSearch: (value: string) => void;
}

export const Search = React.memo((props: IProps) => {
  return (
    <StyledInput
      type="search"
      onChange={e => props.onSearch(e.target.value)}
      placeholder="Search"
    />
  );
});
