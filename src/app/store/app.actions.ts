// PROVEEDOR ACTIONS
export class SetUsername {
    static readonly type = '[app] set username';
    constructor(public playload: string) {}
}
export class SetIdProveedor {
    static readonly type = '[app] set id proveedor';
    constructor(public playload: string) {}
}

export class SetAccion {
    static readonly type = '[app] set accion';
    constructor(public playload: string) {}
}
export class SetShowForm {
    static readonly type = '[app] set showForm';
    constructor(public playload: boolean) {}
}
export class SetShowViewMenu {
  static readonly type = '[app] set showViewMenu';
  constructor(public playload: boolean) {}
}
export class SetShowComponentShop {
  static readonly type = '[app] set showComponentShop';
  constructor(public playload: string) {}
}
export class SetCarrito {
  static readonly type = '[app] set setCarrito';
  constructor(public playload: Array<any>) {}
}
export class SetShowCartModal {
  static readonly type = '[app] set setCarrito';
  constructor(public playload: boolean) {}
}
export class SetDataAlert {
  static readonly type = '[app] set setCarrito';
  constructor(public playload: Object) {}
}
