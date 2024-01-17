export interface DbToken {
  identifier: string;
  token: string;
  activatedAt: Date;
  expire: Date;
  userId: string;
}

export interface dbUser {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  image: string;
}
