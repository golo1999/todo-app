import styled from "styled-components";

export const Container = {
  Footer: styled.div`
    align-items: center;
    color: gray;
    display: flex;
    font-weight: 500;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;

    @media screen {
      @media (max-width: 425px) {
        font-size: 13px;
      }
    }
  `,
  Main: styled.div`
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 0 5px darkgray;
  `,
};

export const List = {
  Todos: styled.ul`
    display: flex;
    flex-direction: column;
    list-style-type: none;
  `,
};

interface ClearCompletedTextProps {
  $isHidden: boolean;
}

export const Text = {
  ClearCompleted: styled.p<ClearCompletedTextProps>`
    text-transform: capitalize;
    user-select: none;
    ${({ $isHidden }) => $isHidden && "visibility: hidden;"};
  `,
};
