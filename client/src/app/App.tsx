import { Checkbox } from "@mui/material";
import axios from "axios";
import { ChangeEvent, createRef, useEffect, useState } from "react";

import { FilteringList, TodoList } from "components";
import { useWindowSize } from "hooks";
import { Todo, TodoDto } from "models";
import { useTodoStore } from "store";

import { Container, Icon, Input } from "./App.style";

export function App() {
  const inputRef = createRef<HTMLInputElement>();
  const [isAddTodoIconVisible, setIsAddTodoIconVisible] = useState(false);
  const [isTodoComplete, setIsTodoComplete] = useState(false);
  const { todoList, addTodo, setTodoList } = useTodoStore();
  const { width } = useWindowSize();

  useEffect(() => {
    const controller = new AbortController();

    async function getTodos() {
      try {
        const { data } = await axios.get<Todo[]>("api/TodoItems", {
          signal: controller.signal,
        });
        setTodoList(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log({ cancelError: error });
        } else {
          console.log({ error });
        }
      }
    }

    getTodos();

    return () => controller.abort();
  }, [setTodoList]);

  async function createTodo(todo: TodoDto) {
    try {
      const { data: newTodo } = await axios.post<Todo>("api/TodoItems", {
        ...todo,
      });
      addTodo(newTodo);
    } catch (error) {
      console.log({ error });
    }
  }

  function handleInputChange({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) {
    setIsAddTodoIconVisible(value.trim().length !== 0);
  }

  function handleAddTodoIconClick() {
    if (!inputRef.current) {
      return;
    }

    const name = inputRef.current.value.trim();

    createTodo({
      isComplete: isTodoComplete,
      name,
      dateTime: new Date().getTime().toString(),
    });
    inputRef.current.value = "";
    setIsAddTodoIconVisible(false);
    setIsTodoComplete(false);
  }

  const iconFontSize =
    width <= 425 ? "small" : width <= 1440 ? "medium" : "large";
  const isTodoListVisible = todoList.length > 0;

  return (
    <Container.Main>
      <Container.Content>
        <Container.HeaderFooter>
          <Checkbox
            checked={isTodoComplete}
            color="primary"
            inputProps={{ "aria-label": "controlled" }}
            size={iconFontSize}
            style={{ padding: 0 }}
            onChange={({ target: { checked } }) => setIsTodoComplete(checked)}
          />
          <Input
            placeholder="Create a new todo..."
            ref={inputRef}
            spellCheck={false}
            onChange={handleInputChange}
          />
          <Icon.AddTodo
            $isVisible={isAddTodoIconVisible}
            fontSize={iconFontSize}
            onClick={handleAddTodoIconClick}
          />
        </Container.HeaderFooter>
        {isTodoListVisible && <TodoList />}
        {width < 600 && isTodoListVisible && (
          <Container.HeaderFooter $isCenteredHorizontally>
            <FilteringList />
          </Container.HeaderFooter>
        )}
      </Container.Content>
    </Container.Main>
  );
}
