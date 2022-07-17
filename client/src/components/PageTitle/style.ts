import styled from "styled-components";

export const Title = styled.header`
  display: flex;
  flex: row wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  height: 48px;

  span {
    font-weight: 500;
    font-size: 32px;
  }

  img {
    cursor: pointer;
  }
`;
