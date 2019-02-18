import { State, Action, StateContext, Actions, ofAction } from '@ngxs/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export class Navigate {
  static readonly type = '[router] navigate';
  constructor(public playload: string) {}
}
@State<string>({
  name: 'router',
  defaults: ''
})
export class RouterState {
  constructor(private router: Router) {}

  @Action(Navigate)
  async changeRoute(context: StateContext<string>, action: Navigate) {
    const path = action.playload;
    await this.router.navigate([path]);
    context.setState( path );
  }
}

@Injectable()
export class RouterHandler {
  constructor(private router: Router, private actions$: Actions) {
    this.actions$
      .pipe(ofAction(Navigate))
      .subscribe(({playload}) => this.router.navigate([playload]));
  }
}
