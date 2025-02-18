import { computed } from '@angular/core';
import { withStorage } from '@larscom/ngrx-signals-storage';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

interface AuthState {
  username: string;
}

const initialState: AuthState = {
  username: '',
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ username }) => ({
    loggedIn: computed(() => !!username()),
  })),
  withMethods((store) => ({
    login(username: string) {
      patchState(store, () => ({ username }));
    },
    logout() {
      patchState(store, () => ({ username: '' }));
    },
  })),
  withStorage('AUTH', localStorage),
);
