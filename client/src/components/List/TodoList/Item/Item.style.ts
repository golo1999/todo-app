import styled from "styled-components";

export const Container = {
  Details: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  `,
  Icons: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5rem;

    @media screen {
      @media (max-width: 599px) {
        align-self: flex-start;
      }
    }
  `,
  Main: styled.li`
    align-items: center;
    border-bottom: 1px solid gainsboro;
    display: flex;
    font-weight: 600;
    gap: 0.5rem;
    padding: 1rem;
  `,
};

interface NameTextProps {
  $isSelected: boolean;
}

export const Text = {
  DateTime: styled.p`
    color: gray;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen {
      @media (max-width: 425px) {
        font-size: 12px;
      }
    }
  `,
  Name: styled.p<NameTextProps>`
    font-size: 17px;
    overflow: hidden;
    ${({ $isSelected }) =>
      $isSelected && "text-decoration-line: line-through;"};
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen {
      @media (max-width: 425px) {
        font-size: 15px;
      }
    }
  `,
};
