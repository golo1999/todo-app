import axios from "axios";
import { ChangeEvent, createRef, useEffect, useState } from "react";

import { TodoList } from "components";
import { Todo, TodoDto } from "models";
import { useTodoStore } from "store";

import { Container, Icon, Input } from "./App.style";

export function App() {
  const inputRef = createRef<HTMLInputElement>();
  const [isAddTodoIconVisible, setIsAddTodoIconVisible] = useState(false);
  const { todoList, addTodo, setTodoList } = useTodoStore();

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

    const todoName = inputRef.current?.value.trim();

    createTodo({
      isComplete: false,
      name: todoName,
      dateTime: new Date().getTime().toString(),
    });
    inputRef.current.value = "";
  }

  const isTodoListVisible = todoList.length > 0;

  return (
    <Container.Main>
      <Container.Content>
        <Container.Input>
          <Input
            placeholder="Create a new todo..."
            ref={inputRef}
            spellCheck={false}
            onChange={handleInputChange}
          />
          <Icon.AddTodo
            $isVisible={isAddTodoIconVisible}
            onClick={handleAddTodoIconClick}
          />
        </Container.Input>
        {isTodoListVisible && <TodoList />}
      </Container.Content>
    </Container.Main>
  );
}
