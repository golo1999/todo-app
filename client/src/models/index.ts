import { FILTERING_ITEMS } from "consts";

export type FilteringItem = (typeof FILTERING_ITEMS)[number];

export type JsonPatchOperation = {
  op: "add" | "copy" | "move" | "remove" | "replace" | "test";
  path: string;
  value: any;
};

export type Todo = {
  id: number;
  isComplete: boolean;
  name: string;
  dateTime: string;
};

export type TodoDto = { isComplete: boolean; name: string; dateTime: string };
