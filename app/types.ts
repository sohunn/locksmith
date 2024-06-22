export type DatabaseUser = {
  username: string;
  email: string;
  password: string;
  passwords: Password[];
};

export type Password = {
  for: string;
  value: string;
  algo: AlgorithmsType;
  key?: string;
};

export type AlertStruct = {
  msg: string;
  type: "info" | "success" | "error" | "warning";
};

export type SessionDetails = {
  isLoggedIn?: boolean;
  username?: string;
  passwords?: Password[];
  userID?: string;
};

export const Algorithms: AlgorithmsType[] = [
  "Advanced Encryption Standard",
  "Triple DES",
  "Blowfish",
  "Twofish",
];

export type AlgorithmsType =
  | "Advanced Encryption Standard"
  | "Triple DES"
  | "Blowfish"
  | "Twofish";
