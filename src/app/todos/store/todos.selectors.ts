import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODOS_FEATURE_KEY, TodosState } from './todos.reducer';

export const selectTodosState =
  createFeatureSelector<TodosState>(TODOS_FEATURE_KEY);

export const selectTodos = createSelector(
  selectTodosState,
  state => state.items
);

export const selectCompletedCount = createSelector(
  selectTodos,
  todos => todos.filter(t => t.done).length
);

export const selectTotalCount = createSelector(
  selectTodos,
  todos => todos.length
);

export const selectEditingId = createSelector(
  selectTodosState,
  state => state.editingId
);

export const selectEditingTodo = createSelector(
  selectTodosState,
  state => state.items.find(t => t.id === state.editingId) ?? null
);
