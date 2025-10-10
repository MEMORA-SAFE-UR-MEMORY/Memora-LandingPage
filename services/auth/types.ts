export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  // extend with any additional fields returned by API if needed
  [key: string]: unknown;
};
