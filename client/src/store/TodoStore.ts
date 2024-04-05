import { create } from "zustand";

import { Todo } from "models";

type Store = {
  todoList: Todo[];
  addTodo: (todo: Todo) => void;
  removeCompletedTodos: () => void;
  removeTodo: (id: number) => void;
  setTodoList: (todoList: Todo[]) => void;
  updateTodoCompleteStatus: (id: number, newIsComplete: boolean) => void;
  updateTodoName: (id: number, newName: string) => void;
};

export const useTodoStore = create<Store>((set) => ({
  todoList: [],
  addTodo(todo) {
    const { todoList } = useTodoStore.getState();
    set((state) => ({ ...state, todoList: [...todoList, todo] }));
  },
  removeCompletedTodos() {
    const { todoList } = useTodoStore.getState();
    set((state) => ({
      ...state,
      todoList: todoList.filter((todo) => !todo.isComplete),
    }));
  },
  removeTodo(id) {
    const { todoList } = useTodoStore.getState();
    set((state) => ({
      ...state,
      todoList: todoList.filter((todo) => todo.id !== id),
    }));
  },
  setTodoList(todoList) {
    set((state) => ({ ...state, todoList }));
  },
  updateTodoCompleteStatus(id, newIsComplete) {
    const { todoList } = useTodoStore.getState();
    set((state) => ({
      ...state,
      todoList: todoList.map((todo) =>
        todo.id === id ? { ...todo, isComplete: newIsComplete } : todo
      ),
    }));
  },
  updateTodoName(id, newName) {
    const { todoList } = useTodoStore.getState();
    set((state) => ({
      ...state,
      todoList: todoList.map((todo) =>
        todo.id === id ? { ...todo, name: newName } : todo
      ),
    }));
  },
}));
