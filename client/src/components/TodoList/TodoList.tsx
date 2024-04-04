import axios from "axios";
import { useCallback, useMemo, useRef, useState } from "react";

import { DeleteDialog } from "components";
import { JsonPatchOperation, Todo } from "models";

import { Item } from "./Item";

import { Container, List, Text } from "./TodoList.style";

const TODO_LIST_STATUSES = ["ALL", "ACTIVE", "COMPLETED"] as const;

type TodoListStatus = (typeof TODO_LIST_STATUSES)[number];

interface Props {
  todos: Todo[];
}

export function TodoList({ todos }: Props) {
  const deletedTodoRef = useRef<Todo | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TodoListStatus>("ALL");

  const deleteTodo = useCallback(async (id: number) => {
    try {
      await axios.delete(`api/TodoItems/${id}`);
      console.log("removed");
    } catch (error) {
      console.log({ error });
    }
  }, []);
  const patchTodo = useCallback(
    async (id: number, body: JsonPatchOperation[]) => {
      try {
        await axios.patch(`api/TodoItems/${id}`, body);
      } catch (error) {
        console.log({ error });
      }
    },
    []
  );

  const closeDeleteDialog = useCallback(() => setIsDeleteDialogOpen(false), []);
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
    [patchTodo]
  );
  const handleClearCompletedClick = useCallback(async () => {
    try {
      await axios.delete("api/TodoItems/completed");
    } catch (error) {
      console.log({ error });
    }
  }, []);
  const handleDeleteTodoClick = useCallback(() => {
    if (deletedTodoRef.current) {
      deleteTodo(deletedTodoRef.current.id);
      deletedTodoRef.current = null;
    }
    closeDeleteDialog();
  }, [closeDeleteDialog, deleteTodo]);
  const openDeleteDialog = useCallback(() => setIsDeleteDialogOpen(true), []);

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
  const completedTodos = useMemo(
    () => filteredTodos.filter((todo) => todo.isComplete),
    [filteredTodos]
  );
  const isClearCompletedTextHidden = useMemo(
    () => completedTodos.length === 0,
    [completedTodos]
  );
  const remainingTodosText = useMemo(
    () =>
      `${filteredTodos.length} ${
        filteredTodos.length === 1 ? "item" : "items"
      } left`,
    [filteredTodos]
  );

  return (
    <>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteTodoClick}
      />
      <Container.Main>
        <List.Todos>
          {filteredTodos.map((todo) => {
            function handleDeleteIconClick() {
              deletedTodoRef.current = todo;
              openDeleteDialog();
            }

            const { id } = todo;

            return (
              <Item
                key={id}
                todo={todo}
                onCheckboxValueChange={(value) =>
                  handleCheckboxValueChange(id, value)
                }
                onDeleteIconClick={handleDeleteIconClick}
              />
            );
          })}
        </List.Todos>
        <Container.Footer>
          <p>{remainingTodosText}</p>
          <List.Statuses>
            {TODO_LIST_STATUSES.map((status, index) => {
              function handleClick() {
                if (selectedStatus !== status) {
                  setSelectedStatus(status);
                }
              }

              const formattedStatus = status
                .substring(0, 1)
                .concat(status.substring(1).toLowerCase());
              const isSelected = selectedStatus === status;

              return (
                <Container.Status
                  $isSelected={isSelected}
                  key={index}
                  onClick={handleClick}
                >
                  {formattedStatus}
                </Container.Status>
              );
            })}
          </List.Statuses>
          <Text.ClearCompleted
            $isHidden={isClearCompletedTextHidden}
            onClick={handleClearCompletedClick}
          >
            Clear completed
          </Text.ClearCompleted>
        </Container.Footer>
      </Container.Main>
    </>
  );
}
