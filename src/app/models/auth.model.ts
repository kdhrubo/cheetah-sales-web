export class SignInRequest {
  email: string;
  password: string;
}

export class SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  country: string;
}

export class ForgotPwdRequest {
  verificationCode: Number;
  email: string;
  password: string;
}

export class AuthJwt {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
}

export class User {
  id: string;
  mobile: string;
  fullName: string;
  email: string;
  createdDate: Date;
  lastLoginDate: Date;
  readItems: ReadItem[];
}

export class ReadItem {
  id: string; //bookid
  title: string;

  localTitle: string;

  coverUrl: string;
  started: Date;
  lastAccessed: Date;
  percentage: Number;
  readTime: Number;
}
