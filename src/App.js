import React, { useState, useEffect } from "react";
import { fetchAndProcessData, submitResponse } from "./utils";

const App = () => {
  useEffect(() => {
    async function anyNameFunction() {
      const [formID, formName, answers] = await fetchAndProcessData();

      submitResponse(formID, answers);
    }
    anyNameFunction();
  }, []);

  return <div>Hello</div>;
};

export default App;
