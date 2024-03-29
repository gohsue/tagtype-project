import { grey_150 } from 'common/colors';
import styled from 'styled-components';

export const GridStyle = styled.div<{ template?: string; gap?: string; padding?: string }>`
  position: relative;
  display: grid;
  grid-template-columns: ${({template}) => (template ? template : '1fr 1fr')};
  grid-gap: ${({gap}) => (gap ? gap : 0)};
  justify-items: center;

  padding: ${({padding}) => (padding ? padding : '0')};
`;

export const GridLayout = styled.div<{ row?: string; column?: string }>`
  grid-row: ${({row}) => (row ? row : 'span 1')};
  grid-column: ${({column}) => (column ? column : 'span 1')};

  width: 100%;
`;

export const GridDivider = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${grey_150};
`;
