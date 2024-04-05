import axios from "axios";
import { useCallback, useMemo, useRef, useState } from "react";

import { DeleteDialog, UpdateNameDialog } from "components";
import { JsonPatchOperation, Todo } from "models";
import { useTodoStore } from "store";

import { Item } from "./Item";

import { Container, List, Text } from "./TodoList.style";

const TODO_LIST_STATUSES = ["ALL", "ACTIVE", "COMPLETED"] as const;

type TodoListStatus = (typeof TODO_LIST_STATUSES)[number];

export function TodoList() {
  const deletedTodoRef = useRef<Todo | null>(null);
  const updatedTodoRef = useRef<Todo | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateNameDialogOpen, setIsUpdateNameDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TodoListStatus>("ALL");
  const {
    todoList,
    removeCompletedTodos,
    removeTodo,
    updateTodoCompleteStatus,
    updateTodoName,
  } = useTodoStore();

  const deleteTodo = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`api/TodoItems/${id}`);
        removeTodo(id);
        console.log("removed");
      } catch (error) {
        console.log({ error });
      }
    },
    [removeTodo]
  );
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
  const closeUpdateNameDialog = useCallback(
    () => setIsUpdateNameDialogOpen(false),
    []
  );
  const handleCheckboxValueChange = useCallback(
    (todoId: number, isTodoCompleted: boolean) => {
      const body: JsonPatchOperation[] = [
        {
          path: "/isComplete",
          op: "replace",
          value: isTodoCompleted,
        },
      ];

      patchTodo(todoId, body);
      updateTodoCompleteStatus(todoId, isTodoCompleted);
    },
    [patchTodo, updateTodoCompleteStatus]
  );
  const handleClearCompletedClick = useCallback(async () => {
    try {
      await axios.delete("api/TodoItems/completed");
      removeCompletedTodos();
    } catch (error) {
      console.log({ error });
    }
  }, [removeCompletedTodos]);
  const handleDeleteTodoClick = useCallback(() => {
    if (deletedTodoRef.current) {
      deleteTodo(deletedTodoRef.current.id);
      deletedTodoRef.current = null;
    }
    closeDeleteDialog();
  }, [closeDeleteDialog, deleteTodo]);
  const openDeleteDialog = useCallback(() => setIsDeleteDialogOpen(true), []);
  const openUpdateNameDialog = useCallback(
    () => setIsUpdateNameDialogOpen(true),
    []
  );
  const handleUpdateTodoNameClick = useCallback(
    (updatedName: string) => {
      if (updatedTodoRef.current) {
        const body: JsonPatchOperation[] = [
          {
            path: "/name",
            op: "replace",
            value: updatedName,
          },
        ];

        patchTodo(updatedTodoRef.current.id, body);
        updateTodoName(updatedTodoRef.current.id, updatedName);
        updatedTodoRef.current = null;
      }
      closeUpdateNameDialog();
    },
    [closeUpdateNameDialog, patchTodo, updateTodoName]
  );

  const filteredTodos = useMemo(() => {
    switch (selectedStatus) {
      case "ACTIVE":
        return todoList.filter((todo) => !todo.isComplete);
      case "ALL":
        return todoList;
      case "COMPLETED":
        return todoList.filter((todo) => todo.isComplete);
    }
  }, [selectedStatus, todoList]);
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
      <UpdateNameDialog
        currentName={updatedTodoRef.current?.name}
        isOpen={isUpdateNameDialogOpen}
        onClose={closeUpdateNameDialog}
        onUpdate={handleUpdateTodoNameClick}
      />
      <Container.Main>
        <List.Todos>
          {filteredTodos.map((todo) => {
            function handleDeleteIconClick() {
              deletedTodoRef.current = todo;
              openDeleteDialog();
            }
            function handleEditIconClick() {
              updatedTodoRef.current = todo;
              openUpdateNameDialog();
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
                onEditIconClick={handleEditIconClick}
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
