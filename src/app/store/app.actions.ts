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

export class SetShowComponentShop {
    static readonly type = '[app] set showComponentShop';
    constructor(public playload: string) {}
}
