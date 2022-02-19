import { ChangeEventHandler, useCallback, useState } from "react";
import { changeValue } from "../utils/changeValue";

type Clear = () => void;
type HookValueReturn = [string, ChangeEventHandler<any> | undefined, Clear];

function useValue(initialState: string = ""): HookValueReturn {
  const [value, setValue] = useState(initialState);
  return [value, useCallback(changeValue(setValue), []), useCallback(() => setValue(""), [])];
}

export default useValue;
