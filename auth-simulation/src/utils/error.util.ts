const getErrorMessage = (error: any): string => {
  if (!error) {
    return "An unknown error occurred";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error.message) {
    return error.message;
  }

  if (error.details) {
    return error.details;
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error.code) {
    switch (error.code) {
      case 400:
        return "Bad request - Please check your input";
      case 401:
        return "Unauthorized - Please login again";
      case 403:
        return "Access denied";
      case 404:
        return "Resource not found";
      case 500:
        return "Server error - Please try again later";
      default:
        return `Error ${error.code}`;
    }
  }

  if (error.name === "TypeError" && error.message?.includes("fetch")) {
    return "Network error - Please check your connection";
  }

  return "Something went wrong. Please try again.";
};

export default getErrorMessage;
