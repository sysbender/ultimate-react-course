import { useState, useEffect } from "react";

function useStorageState(initialState, itemName) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(itemName);
    console.log("stored value = ", storedValue);

    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // save watched to localstorage
  useEffect(
    function () {
      localStorage.setItem(itemName, JSON.stringify(value));
      console.log("saved to local storage");
    },
    [value, itemName]
  );

  return [value, setValue];
}

export { useStorageState };
