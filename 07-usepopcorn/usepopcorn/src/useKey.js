import { useEffect } from "react";

function useKey(keyName, callback) {
  useEffect(
    function () {
      function handleKeyDown(e) {
        console.log(e);
        if (e.key.toLowerCase() === keyName.toLowerCase()) {
          console.log("esc pressed");

          callback();
        }
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },

    [keyName, callback]
  );
}

export { useKey };
