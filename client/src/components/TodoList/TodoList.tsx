import axios from "axios";
import { useMemo, useState } from "react";
import styled from "styled-components";

import { Todo } from "models";

import { Item } from "./Item";

interface StatusContainerProps {
  $isSelected: boolean;
}

const Container = {
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

const List = {
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

const TODO_LIST_STATUSES = ["ALL", "ACTIVE", "COMPLETED"] as const;

type TodoListStatus = (typeof TODO_LIST_STATUSES)[number];

interface Props {
  todos: Todo[];
}

export function TodoList({ todos }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<TodoListStatus>("ALL");

  async function deleteTodo(id: number) {
    try {
      await axios.delete(`api/TodoItems/${id}`);
      console.log("removed");
    } catch (error) {
      console.log({ error });
    }
  }

  const filteredTodos = useMemo(() => {
    switch (selectedStatus) {
      case "ACTIVE":
        return todos.filter((todo) => !todo.isComplete);
      case "ALL":
        return todos;
      case "COMPLETED":
        return todos.filter((todo) => todo.isComplete);
    }
  }, [selectedStatus, todos]);
  const remainingTodosText = useMemo(
    () =>
      `${filteredTodos.length} ${
        filteredTodos.length === 1 ? "item" : "items"
      } left`,
    [filteredTodos]
  );

  return (
    <Container.Main>
      <List.Todos>
        {filteredTodos.map((todo) => (
          <Item
            key={todo.id}
            todo={todo}
            onDeleteIconClick={() => deleteTodo(todo.id)}
          />
        ))}
      </List.Todos>
      <Container.Footer>
        <p>{remainingTodosText}</p>
        <List.Statuses>
          {TODO_LIST_STATUSES.map((status, index) => {
            const formattedStatus = status
              .substring(0, 1)
              .concat(status.substring(1).toLowerCase());

            return (
              <Container.Status
                $isSelected={selectedStatus === status}
                key={index}
                onClick={() => {
                  if (selectedStatus !== status) {
                    setSelectedStatus(status);
                  }
                }}
              >
                {formattedStatus}
              </Container.Status>
            );
          })}
        </List.Statuses>
        <p style={{ userSelect: "none" }}>Clear Completed</p>
      </Container.Footer>
    </Container.Main>
  );
}
