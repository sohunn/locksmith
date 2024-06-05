export type User = {
  username: string;
  email: string;
  password: string;
  passwords: Password[];
};

type Password = {
  for: string;
  value: string;
};
