export const getErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error?.data === "object" &&
    error?.data !== null &&
    "message" in error.data
  ) {
    return (
      (error?.data as { message?: string }).message ?? "Something went wrong."
    );
  }

  if ("message" in (error as any)) {
    return (error as any)?.message ?? "Something went wrong.";
  }

  return "An unexpected error occurred. If this persists, please contact support.";
};
