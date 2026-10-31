export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'OPERATOR_REGISTRATION'
  | 'OPERATOR_WAREHOUSE'
  | 'OPERATOR_DOCK'
  | 'OPERATOR_KPP';

export interface AuthUser {
  readonly id: number;
  readonly email: string;
  readonly fullName: string;
  readonly role: UserRole;
  readonly roleTitle: string;
  readonly targetUrl: string;
  readonly avatar?: string;
}

export interface LoginApiResponse {
  readonly success: boolean;
  readonly token?: string;
  readonly message?: string;
  readonly user?: AuthUser;
}
