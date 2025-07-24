const getSuccessMessage = (response: any): string => {
  if (!response) {
    return "Operation completed successfully";
  }

  if (typeof response === "string") {
    return response;
  }

  if (response.message) {
    return response.message;
  }

  if (response.data?.message) {
    return response.data.message;
  }

  if (response.success === true) {
    return response.message || "Completed successfully";
  }

  if (response.status || response.code) {
    const statusCode = response.status || response.code;
    if (statusCode === 200 || statusCode === 201) {
      return "Completed successfully";
    }
  }

  return "Completed successfully";
};

export default getSuccessMessage;
