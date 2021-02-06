import React from "react";
import Alert from "react-bootstrap/Alert";

const ErrorBox = ({ message }) => {
  return (
    <Alert variant="danger" className="mx-auto my-3">
      <Alert.Heading>Something Went Wrong :'(</Alert.Heading>
      <p>{`Error Message: ${message}`}</p>
      <hr />
      <p>
        Please check the URL. If error persists, refresh the page or try again
        later.
      </p>
    </Alert>
  );
};

export default ErrorBox;
