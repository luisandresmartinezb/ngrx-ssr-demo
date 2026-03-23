import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TodosActions from '../store/todos.actions';
import {
  selectTodos,
  selectCompletedCount,
  selectTotalCount,
  selectEditingTodo
} from '../store/todos.selectors';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="container py-4">
    <div class="card shadow-sm">
      <div class="card-body">

        <h1 class="h3 mb-1">NgRx + SSR Demo</h1>
        <p class="text-muted mb-3">
          Total: <b>{{ total$ | async }}</b> |
          Completadas: <b>{{ completed$ | async }}</b>
        </p>

        <!-- MODO EDICIÓN -->
        <div class="input-group mb-3"
             *ngIf="(editingTodo$ | async) as editing; else createMode">
          <input
            class="form-control"
            [value]="newTodo()"
            (input)="newTodo.set($any($event.target).value)"
            placeholder="Editar tarea..."
          />
          <button class="btn btn-success"
                  (click)="saveEdit(editing)">
            Guardar
          </button>
          <button class="btn btn-outline-secondary"
                  (click)="cancelEdit()">
            Cancelar
          </button>
        </div>

        <!-- MODO CREAR -->
        <ng-template #createMode>
          <div class="input-group mb-3">
            <input
              class="form-control"
              [value]="newTodo()"
              (input)="newTodo.set($any($event.target).value)"
              placeholder="Nueva tarea..."
            />
            <button class="btn btn-primary"
                    (click)="add()">
              Añadir
            </button>
            <button class="btn btn-outline-secondary"
                    (click)="clear()">
              Limpiar completadas
            </button>
          </div>
        </ng-template>

        <!-- LISTA -->
        <ul class="list-group">
          <li
            class="list-group-item d-flex align-items-center justify-content-between"
            *ngFor="let todo of (todos$ | async)"
          >
            <div class="d-flex align-items-center gap-2">
              <input
                class="form-check-input"
                type="checkbox"
                [checked]="todo.done"
                (change)="toggle(todo.id)"
              />
              <span
                [class.text-decoration-line-through]="todo.done"
                [class.text-muted]="todo.done">
                {{ todo.text }}
              </span>
            </div>

            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary"
                      (click)="edit(todo)">
                Editar
              </button>

              <button class="btn btn-sm btn-outline-danger"
                      (click)="remove(todo.id)">
                Eliminar
              </button>
            </div>
          </li>
        </ul>

        <div class="alert alert-info mt-3 mb-0">
          Abre <b>Redux DevTools</b> para ver las <b>Actions</b>
          y el <b>State</b> en tiempo real.
        </div>

      </div>
    </div>
  </div>
  `
})
export class TodosPageComponent {

  private store = inject(Store);

  newTodo = signal('');

  todos$ = this.store.select(selectTodos);
  completed$ = this.store.select(selectCompletedCount);
  total$ = this.store.select(selectTotalCount);
  editingTodo$ = this.store.select(selectEditingTodo);

  add() {
    const v = this.newTodo().trim();
    if (!v) return;

    this.store.dispatch(
      TodosActions.addTodo({ text: v })
    );
    this.newTodo.set('');
  }

  edit(todo: any) {
    this.store.dispatch(
      TodosActions.startEdit({ id: todo.id })
    );
    this.newTodo.set(todo.text);
  }

  saveEdit(todo: any) {
    const v = this.newTodo().trim();
    if (!v) return;

    this.store.dispatch(
      TodosActions.updateTodo({ id: todo.id, text: v })
    );
    this.newTodo.set('');
  }

  cancelEdit() {
    this.store.dispatch(
      TodosActions.cancelEdit()
    );
    this.newTodo.set('');
  }

  toggle(id: string) {
    this.store.dispatch(
      TodosActions.toggleTodo({ id })
    );
  }

  remove(id: string) {
    this.store.dispatch(
      TodosActions.removeTodo({ id })
    );
  }

  clear() {
    this.store.dispatch(
      TodosActions.clearCompleted()
    );
  }
}
