type Subscription<State> = (state: State) => void;
type StateChanger<State> = (state: State) => State;

/**
 *  @description Класс, который должны наследовать презенторы
 *  Содержит стейт, который прокидывается сверху
 *  и методы подписки и отписки, при изменении состояния, нужно вручную вызвать changeState,
 *  чтобы уведомить представление об изменениях
 */
export class BLoC<State> {
  private listeners: Subscription<State>[] = [];

  constructor(private internalState: State) {}

  public get state(): State {
    return this.internalState;
  }

  /**
   * @description функция изменения состояния,
   * перетирает старое состояние новым, и уведомляет слушателей об изменениях
   */
  changeState(changeState: StateChanger<State>) {
    this.internalState = changeState(this.internalState);

    if (this.listeners.length > 0) {
      this.listeners.forEach((listener) => listener(this.state));
    }
  }

  subscribe(listener: Subscription<State>) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Subscription<State>) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}
