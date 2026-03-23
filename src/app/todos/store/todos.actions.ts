import { createAction, props } from '@ngrx/store';

export const addTodo = createAction(
  '[Todos] Add',
  props<{ text: string }>()
);

export const toggleTodo = createAction(
  '[Todos] Toggle',
  props<{ id: string }>()
);

export const removeTodo = createAction(
  '[Todos] Remove',
  props<{ id: string }>()
);

export const clearCompleted = createAction(
  '[Todos] Clear Completed'
);

export const startEdit = createAction(
  '[Todos] Start Edit',
  props<{ id: string }>()
);

export const updateTodo = createAction(
  '[Todos] Update',
  props<{ id: string; text: string }>()
);

export const cancelEdit = createAction('[Todos] Cancel Edit');
