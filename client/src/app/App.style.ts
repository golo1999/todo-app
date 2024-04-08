import { Send } from "@mui/icons-material";
import styled from "styled-components";

interface HeaderFooterContainerProps {
  $isCenteredHorizontally?: boolean;
}

export const Container = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50vw;

    @media screen {
      @media (max-width: 767px) {
        flex: 1;
        width: unset;
      }
      @media (max-width: 1023px) {
        width: 75vw;
      }
    }
  `,
  HeaderFooter: styled.div<HeaderFooterContainerProps>`
    align-items: center;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 0 5px darkgray;
    display: flex;
    gap: 0.5rem;
    ${({ $isCenteredHorizontally }) =>
      $isCenteredHorizontally && "justify-content: center;"};
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
  AddTodo: styled(Send).attrs({ color: "action" })<AddTodoIconProps>`
    ${({ $isVisible }) => !$isVisible && "visibility: hidden;"};
  `,
};

export const Input = styled.input.attrs({ type: "text" })`
  color: black;
  flex: 1;
  font-size: 17px;
  font-weight: 500;
  min-width: 0;

  &::placeholder {
    color: darkslategray;
  }

  @media screen {
    @media (max-width: 425px) {
      font-size: 15px;
    }
  }
`;
