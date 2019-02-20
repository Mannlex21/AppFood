import { State, Action, StateContext } from '@ngxs/store';
import { SetIdProveedor, SetShowForm, SetAccion, SetConfirmDialogCancel } from './app.actions';

export interface AppStateModel {
  idProveedor: string;
  accion: string;
  orderId: number;
  showForm: boolean;
  confirmDialogCancel: boolean;
}
@State<AppStateModel>({
  name: 'app',
  defaults: {
    confirmDialogCancel:false,
    idProveedor: '',
    accion:'',
    orderId: Math.floor(Math.random() * 23000),
    showForm: false
  }
})
export class AppState {
  @Action(SetIdProveedor)
  setIdProveedor({ patchState }: StateContext<AppStateModel>, { playload }: SetIdProveedor) {
    patchState({ idProveedor: playload});
  }
  @Action(SetAccion)
  setAccion({ patchState }: StateContext<AppStateModel>, { playload }: SetAccion) {
    patchState({ accion: playload});
  }
  @Action(SetShowForm)
  setShowForm({ patchState }: StateContext<AppStateModel>, { playload }: SetShowForm) {
    patchState({ showForm: playload});
  }
  @Action(SetConfirmDialogCancel)
  setConfirmDialogCancel({ patchState }: StateContext<AppStateModel>, { playload }: SetConfirmDialogCancel) {
    patchState({ confirmDialogCancel: playload});
  }
}
