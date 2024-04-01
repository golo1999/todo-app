import axios from "axios";
import { ChangeEvent, createRef, useEffect, useState } from "react";

import { TodoList } from "components";
import { Todo, TodoDto } from "models";

import { Container, Icon, Input } from "./App.style";

export function App() {
  const inputRef = createRef<HTMLInputElement>();
  const [isAddTodoIconVisible, setIsAddTodoIconVisible] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function getTodos() {
      try {
        const { data } = await axios.get<Todo[]>("api/TodoItems", {
          signal: controller.signal,
        });
        setTodos(data);
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
  }, []);

  async function addTodo(todo: TodoDto) {
    try {
      const { data } = await axios.post<Todo>("api/TodoItems", {
        ...todo,
      });
      console.log({ newTodo: data });
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

    const todoName = inputRef.current?.value.trim();

    addTodo({ isComplete: false, name: todoName });
    inputRef.current.value = "";
  }

  return (
    <Container.Main>
      <Container.Content>
        <Container.Input>
          <Input
            placeholder="Create a new todo..."
            ref={inputRef}
            onChange={handleInputChange}
          />
          <Icon.AddTodo
            $isVisible={isAddTodoIconVisible}
            onClick={handleAddTodoIconClick}
          />
        </Container.Input>
        <TodoList todos={todos} />
      </Container.Content>
    </Container.Main>
  );
}
