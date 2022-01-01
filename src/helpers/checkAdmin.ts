import { CurrentUser } from '../interfaces/interface';
export default function checkAdmin(currentUser: CurrentUser) {
  if (currentUser?.rules === 'admin') return true;
  return false;
}
