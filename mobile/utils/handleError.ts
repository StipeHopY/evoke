// TODO: place everywhere

export function handleError(
  error: unknown,
  message:string = "Something went wrong"
): string {
  return error instanceof Error ? error.message : message;
}

