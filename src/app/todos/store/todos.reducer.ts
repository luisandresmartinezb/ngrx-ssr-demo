import { createReducer, on } from '@ngrx/store';
import { Todo } from './todos.models';
import * as TodosActions from './todos.actions';

export const TODOS_FEATURE_KEY = 'todos';

export interface TodosState {
  items: Todo[];
  editingId: string | null;
}

const initialState: TodosState = {
  items: [
    { id: '1', text: 'Preparar exposición', done: false },
    { id: '2', text: 'Aprobar Azure 204', done: false }
  ],
  editingId: null
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export const todosReducer = createReducer(
  initialState,

  on(TodosActions.addTodo, (state, { text }) => ({
    ...state,
    items: [
      ...state.items,
      { id: generateId(), text, done: false }
    ]
  })),

  on(TodosActions.toggleTodo, (state, { id }) => ({
    ...state,
    items: state.items.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  })),

  on(TodosActions.removeTodo, (state, { id }) => ({
    ...state,
    items: state.items.filter(todo => todo.id !== id)
  })),

  on(TodosActions.clearCompleted, state => ({
    ...state,
    items: state.items.filter(todo => !todo.done)
  })),

  on(TodosActions.startEdit, (state, { id }) => ({
    ...state,
    editingId: id
  })),

  on(TodosActions.cancelEdit, (state) => ({
    ...state,
    editingId: null
  })),

  on(TodosActions.updateTodo, (state, { id, text }) => ({
    ...state,
    editingId: null,
    items: state.items.map(todo =>
      todo.id === id ? { ...todo, text: text.trim() } : todo
    )
  })),





);
