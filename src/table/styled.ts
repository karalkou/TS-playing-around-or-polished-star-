import styled from "styled-components";

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid black;
    padding: 8px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledPaginateContainer = styled.div`
  .paginationList {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    color: #0366d6;
  }
  .paginationListItem,
  .previous,
  .next {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 30px;
    min-height: 30px;
    padding: 0 5px;
    a {
      padding: 10px;
      border: 1px solid black;
      border-radius: 3px;
      color: black;
      &:hover {
        cursor: pointer;
      }
    }
    .active {
      border-color: blue;
      color: blue;
    }
  }
  .disabled {
    color: gray;
    opacity: 0.6;
  }
`;
