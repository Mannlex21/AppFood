export class SetUsername {
    static readonly type = '[app] set username';
    constructor(public playload: string) {}
}
export class SetShowForm {
    static readonly type = '[app] set showForm';
    constructor(public playload: boolean) {}
}
