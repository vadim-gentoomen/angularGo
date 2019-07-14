export class Account {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  roles?: string[];
}

export interface Credentials {
  email: string;
  password: string;
}
