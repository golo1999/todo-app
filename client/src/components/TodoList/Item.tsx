import { MdDelete } from "react-icons/md";
import styled from "styled-components";

import { Todo } from "models";

const Container = {
  Main: styled.li`
    align-items: center;
    border-bottom: 1px solid gainsboro;
    display: flex;
    font-weight: 600;
    gap: 1rem;
    padding: 1rem;
  `,
};

interface Props {
  todo: Todo;
  onDeleteIconClick: () => void;
}

export function Item({ todo, onDeleteIconClick }: Props) {
  return (
    <Container.Main>
      <p style={{ flex: 1 }}>{todo.name}</p>
      <MdDelete color="red" onClick={onDeleteIconClick} />
    </Container.Main>
  );
}
