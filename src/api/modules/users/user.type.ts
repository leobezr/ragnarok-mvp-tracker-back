export interface User {
  email: string;
  password: string;
  name: string;
  timerTableId: string | null;
  createdAt: number;
  clanId: string | null;
}
