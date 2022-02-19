import { useEffect, useState } from "react";

import { BLoC } from "../core/presentation/common/BLoC";

/**
 * Отвечает за связь презенторов с реактом
 * Подписывается на изменения презентора
 * и при изменении состояния вызывает setState, что провоцирует перерендер реакта
 */
export function useBloCState<S>(bloc: BLoC<S>) {
  const [state, setState] = useState(bloc.state);

  useEffect(() => {
    bloc.subscribe(setState);
    return () => bloc.unsubscribe(setState);
  }, [bloc]);

  return state;
}
