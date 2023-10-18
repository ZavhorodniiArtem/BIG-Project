export type BaseUserFieldsType = {
  email: string;
  password: string;
};

export type LoginFieldType = BaseUserFieldsType & {
  remember?: boolean;
};

export type NewUserType = {
  logins: LoginFieldType[];
};
