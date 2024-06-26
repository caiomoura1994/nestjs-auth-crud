import { CreateUserInput } from './../../users/dto/create-user.input';
import { UpdateUserInput } from './../../users/dto/update-user.input';
import { User } from './../../users/user.entity';

export const mockAddAccountParams: CreateUserInput = {
  name: 'Test User',
  email: 'user@email.com',
  password: 'password',
};

export const mockUpdateUserParams: UpdateUserInput = {
  id: 1,
  email: 'email-updated@email.com',
};

export const mockUserModel: User = {
  id: 1,
  ...mockAddAccountParams,
};

export const mockUpdatedUserModel: User = {
  ...mockUserModel,
  email: 'updated-email@email.com',
};

export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    id: 2,
    name: 'Test User 2',
    email: 'email2@email.com',
  } as User,
  {
    id: 3,
    name: 'Test User 3',
    email: 'email3@email.com',
  } as User,
];
