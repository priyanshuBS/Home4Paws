class ErrorApiResponse {
  constructor(error) {
    this.success = false;
    this.error = this.extractErrors(error);
  }

  extractErrors(error) {
    if (typeof error === "string") return error;
    const result = {};
    for (const key in error) {
      result[key] = error[key]._errors?.[0] || "Invalid input";
    }
    return result;
  }
}

export { ErrorApiResponse };
