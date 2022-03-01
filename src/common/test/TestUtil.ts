import { CreateInstanceInput } from 'src/instances/dto/create-instance.input';
import { UpdateInstanceInput } from 'src/instances/dto/update-instance.input';
import { Instance } from 'src/instances/entities/instance.entity';
import { CreateUserInput } from './../../users/dto/create-user.input';
import { UpdateUserInput } from './../../users/dto/update-user.input';
import { User } from './../../users/user.entity';

export const mockAddAccountParams: CreateUserInput = {
  name: 'Test User',
  email: 'user@email.com',
  password: 'password',
};

export const mockUpdateUserParams: UpdateUserInput = {
  id: '1',
  email: 'email-updated@email.com',
};

export const mockUserModel: any = {
  id: '1',
  ...mockAddAccountParams,
  instances: [],
};

export const mockUpdatedUserModel: any = {
  ...mockUserModel,
  email: 'updated-email@email.com',
};

export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    id: '2',
    name: 'Test User 2',
    email: 'email2@email.com',
  } as User,
  {
    id: '3',
    name: 'Test User 3',
    email: 'email3@email.com',
  } as User,
];

export const mockCreateInstanceInput: CreateInstanceInput = {
  name: 'InstanceName',
  ownerId: '1',
  isActived: false,
};
export const mockUpdateInstanceInput: UpdateInstanceInput = {
  ...mockCreateInstanceInput,
  zApiId: 'zApiId',
  zApiToken: 'zApiToken',
  webhookAfterSend: 'webhookAfterSend',
  webhookAfterDisconnect: 'webhookAfterDisconnect',
  webhookAfterReceive: 'webhookAfterReceive',
};

export const mockInstanceModel: Partial<Instance> = {
  ...mockUpdateInstanceInput,
  id: '1',
  owner: new User(),
};
