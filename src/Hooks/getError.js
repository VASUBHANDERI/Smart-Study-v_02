const getError = (error) => {
  if (error == "Request failed with status code 400") {
    return "Please enter valid credentials!";
  } else if ((error = "Request failed with status code 401")) {
    return "Invalid email or password!";
  }
};

export default getError;
