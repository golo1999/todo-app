import styled from "styled-components";

export const Container = {
  Details: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,
  Icons: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5rem;
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
  `,
  Name: styled.p<NameTextProps>`
    font-size: 17px;
    ${({ $isSelected }) =>
      $isSelected && "text-decoration-line: line-through;"};
  `,
};
