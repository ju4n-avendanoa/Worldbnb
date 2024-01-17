export interface Error {
  error: boolean;
  errorMessage: string;
  setError: (error: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
}
