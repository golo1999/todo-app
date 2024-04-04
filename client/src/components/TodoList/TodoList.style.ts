import styled from "styled-components";

interface StatusContainerProps {
  $isSelected: boolean;
}

export const Container = {
  Footer: styled.div`
    align-items: center;
    color: gray;
    display: flex;
    font-weight: 600;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;
  `,
  Main: styled.div`
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 0 5px darkgray;
  `,
  Status: styled.li<StatusContainerProps>`
    ${({ $isSelected }) => $isSelected && "color: royalblue;"};
  `,
};

export const List = {
  Statuses: styled.ul`
    align-items: center;
    display: flex;
    gap: 0.5rem;
    list-style-type: none;
    user-select: none;
  `,
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
