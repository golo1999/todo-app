import axios from "axios";
import { useCallback, useMemo, useState } from "react";

import { JsonPatchOperation, Todo } from "models";

import { Item } from "./Item";

import { Container, List } from "./TodoList.style";

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

  const handleCheckboxValueChange = useCallback(
    (todoId: number, todoIsCompleted: boolean) => {
      const body: JsonPatchOperation[] = [
        {
          path: "/isComplete",
          op: "replace",
          value: todoIsCompleted,
        },
      ];

      patchTodo(todoId, body);
    },
    []
  );
  const handleClearCompletedClick = useCallback(async () => {
    try {
      await axios.delete("api/TodoItems/completed");
    } catch (error) {
      console.log({ error });
    }
  }, []);

  async function patchTodo(id: number, body: JsonPatchOperation[]) {
    try {
      await axios.patch(`api/TodoItems/${id}`, body);
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
            onCheckboxValueChange={(value) =>
              handleCheckboxValueChange(todo.id, value)
            }
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
        <p style={{ userSelect: "none" }} onClick={handleClearCompletedClick}>
          Clear Completed
        </p>
      </Container.Footer>
    </Container.Main>
  );
}
