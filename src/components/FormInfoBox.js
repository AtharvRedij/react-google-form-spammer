import React from "react";
import Alert from "react-bootstrap/Alert";

const FormInfoBox = ({ formName, questions }) => {
  return (
    <Alert variant="success" className="mx-auto my-3">
      <Alert.Heading>{`Form Name - ${formName}`}</Alert.Heading>

      <p>{`${questions.length} question(s) can be spammed`}</p>

      <ol>
        {questions.map((q, id) => (
          <li key={id}>{q[1]}</li>
        ))}
      </ol>
    </Alert>
  );
};

export default FormInfoBox;
