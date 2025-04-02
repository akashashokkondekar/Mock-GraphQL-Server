import { AppUtils } from './AppUtils';

export const UsersData = [
  { id: AppUtils.GenerateRandomGUID() , name: 'Akash Kondekar', email: 'akash@gmail.com', password: 'admin', role: 'Admin' },
  { id: AppUtils.GenerateRandomGUID() , name: 'James Snell', email: 'jane@example.com', password: 'user', role: 'User' },
];

export const IncorrectUsernamePasswordMsg = 'Invalid email or password';