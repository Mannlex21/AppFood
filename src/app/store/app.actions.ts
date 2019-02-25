// PROVEEDOR ACTIONS
export class SetUsername {
    static readonly type = '[app] set username';
    constructor(public playload: string) {}
}
export class SetConfirmDialogCancel {
    static readonly type = '[app] set confirm dialog cancel';
    constructor(public playload: boolean) {}
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

// SHOP ACTIONS
export class SetShowComponentShop {
    static readonly type = '[app] set showComponentShop';
    constructor(public playload: string) {}
}

export class SetLogged {
    static readonly type = '[app] set logged';
    constructor(public playload: boolean){}
}

