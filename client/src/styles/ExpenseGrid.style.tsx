import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const THead = styled.thead`
  background-color: #eeeeee;
  color: black;
  font-weight: 600;

  &:hover {
    background-color: #22ffff;
    cursor: pointer;
  }
`;

const TH = styled.th`
  border: 1px solid black;
  text-align: left;
  padding: 8px;  
  background-color: #aaffff;
  color: black; 
`;

const TR = styled.tr`
  &:nth-child(even) {
    background-color: white;
  }
  &:nth-child(odd) {
    background-color: #ddffffff;
  }
`;

const TD = styled.td`
  border: 1px solid #222222;
  text-align: left;
  padding: 8px;
  color: blue
`;

export { Table, THead, TH, TR, TD };