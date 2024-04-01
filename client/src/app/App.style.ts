import { MdSend } from "react-icons/md";
import styled from "styled-components";

export const Container = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50vw;
  `,
  Input: styled.div`
    align-items: center;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 0 5px darkgray;
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
  `,
  Main: styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    padding: 2rem;
  `,
};

interface AddTodoIconProps {
  $isVisible: boolean;
}

export const Icon = {
  AddTodo: styled(MdSend).attrs({ color: "black" })<AddTodoIconProps>`
    ${({ $isVisible }) => !$isVisible && "visibility: hidden;"};
  `,
};

export const Input = styled.input.attrs({ type: "text" })`
  color: black;
  flex: 1;
`;
