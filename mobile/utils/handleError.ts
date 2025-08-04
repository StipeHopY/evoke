// TODO: place everywhere

export function handleError(
  error: unknown,
  message = "Something went wrong"
): string {
  return error instanceof Error ? error.message : message;
}
