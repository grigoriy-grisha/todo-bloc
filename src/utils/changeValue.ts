import { ChangeEvent } from "react";

export function changeValue<Event extends ChangeEvent<any>>(change: (e: string) => void) {
  return (event: Event) => change(event.target.value);
}
