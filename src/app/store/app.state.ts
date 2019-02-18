import { State, Action, StateContext } from '@ngxs/store';
import { SetUsername, SetShowForm } from './app.actions';

export interface AppStateModel {
  username: string;
  orderId: number;
  showForm: boolean;
}
@State<AppStateModel>({
  name: 'app',
  defaults: {
    username: '',
    orderId: Math.floor(Math.random() * 23000),
    showForm: false
  }
})
export class AppState {
  @Action(SetUsername)
  setUsername({ patchState }: StateContext<AppStateModel>, { playload }: SetUsername) {
    patchState({ username: playload});
  }
  @Action(SetShowForm)
  setShowForm({ patchState }: StateContext<AppStateModel>, { playload }: SetShowForm) {
    patchState({ showForm: playload});
  }
}
