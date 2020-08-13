import React, { useState, ChangeEvent, Dispatch } from "react";

/**
 * This type represent all input event types (for instance inputs, selects and text areas).
 */
type EventType =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

export default function useInput<T>(initialValue: T): [T, Dispatch<EventType>, Dispatch<T>] {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = (e: EventType) => {
    const inputValue: T = e.target.value as any;
    setValue(inputValue);
  };

  const updateValue = (value: T) => {
    setValue(value);
  };

  return [value, handleChange, updateValue];
}

/*

--- HOW TO USE ---

const [value, handleChange, updateValue] = useInput(defaultValue);

// handleChange is a function that should be set in the input's onChange event.
// updateValue is like useState's setValue. It sets the value without using the change handler.

*/
