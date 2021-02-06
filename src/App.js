import React, { useState, useEffect } from "react";
import URLBox from "./components/URLBox";
import { fetchAndProcessData, submitResponse } from "./utils";
import Container from "react-bootstrap/Container";
import ErrorBox from "./components/ErrorBox";

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [googleFormURL, setGoogleFormURL] = useState("");

  const [fetchingForm, setFetchingForm] = useState(false);

  useEffect(() => {
    // async function anyNameFunction() {
    //   submitResponse(formID, answers);
    // }
    //anyNameFunction();
  }, []);

  const fetchForm = async () => {
    setFetchingForm(true);

    const result = await fetchAndProcessData();
    if (typeof result === "string") {
      console.log(result);
      setErrorMessage(result);
    } else {
      const [formID, formName, answers] = result;
      console.log(formID, formName, answers);
    }

    setFetchingForm(false);
  };

  return (
    <Container>
      <URLBox
        setGoogleFormURL={setGoogleFormURL}
        fetchingForm={fetchingForm}
        fetchForm={fetchForm}
      />
      {errorMessage && <ErrorBox message={errorMessage} />}
      <h1>{googleFormURL}</h1>
    </Container>
  );
};

export default App;
