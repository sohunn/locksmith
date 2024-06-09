export type User = {
  username: string;
  email: string;
  password: string;
  passwords?: Password[];
};

type Password = {
  for: string;
  value: string;
};

export type AlertStruct = {
  msg: string;
  type: "info" | "success" | "error" | "warning";
};
