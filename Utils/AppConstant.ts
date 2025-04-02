import { AppUtils } from './AppUtils';

export const UserList = [
  { id: '1' , name: 'Akash Kondekar', email: 'akash@gmail.com', password: 'admin', role: 'Admin' },
  { id: '2' , name: 'James Snell', email: 'jane@example.com', password: 'user', role: 'User' },
];

export const IncorrectUsernamePasswordMsg = 'Invalid email or password';
export const UnAuthenticatedErrorCode = 'UNAUTHENTICATED';
export const InternalServerErrorMsg = 'INTERNAL_SERVER_ERROR';