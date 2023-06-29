export class KeyData {
  public keyPredicate: ((data: KeyboardEvent) => boolean) | string | null = null;
  public ctrl: boolean = false;
  public shift: boolean = false;
  public alt: boolean = false;

  match: (data: KeyboardEvent) => boolean = (data) => {
    if (this.keyPredicate == null) {
      return false;
    }

    if (typeof this.keyPredicate === "string") {
      return (
        (this.keyPredicate as string) === data.key &&
        data.altKey === this.alt &&
        data.ctrlKey === this.ctrl &&
        data.shiftKey === this.shift
      );
    }

    return this.keyPredicate(data) && data.altKey === this.alt && data.ctrlKey === this.ctrl && data.shiftKey === this.shift;
  };
}

export class KeyAction {
  public keyData: KeyData = new KeyData();
  public action: ((data: KeyboardEvent) => void) | null = null;

  act: (data: KeyboardEvent) => boolean = (data) => {
    const result = this.keyData.match(data) && !!this.action;
    if (result) this.action!(data);
    return result;
  };
}

export class KeyActionBuilder {
  private _keyAction: KeyAction = new KeyAction();

  predicate(func: ((data: KeyboardEvent) => boolean) | string): KeyActionBuilder {
    this._keyAction.keyData.keyPredicate = func;
    return this;
  }

  modifierKeys(ctrl: boolean, shift: boolean, alt: boolean): KeyActionBuilder {
    this._keyAction.keyData.alt = alt;
    this._keyAction.keyData.ctrl = ctrl;
    this._keyAction.keyData.shift = shift;
    return this;
  }

  action(func: (data: KeyboardEvent) => void): KeyActionBuilder {
    this._keyAction.action = func;
    return this;
  }

  reset(): KeyActionBuilder {
    this._keyAction = new KeyAction();
    return this;
  }

  getObj(): KeyAction {
    return this._keyAction;
  }
}
