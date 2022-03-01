import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateInstanceInput } from './dto/create-instance.input';
import { UpdateInstanceInput } from './dto/update-instance.input';
import { Instance } from './entities/instance.entity';

@Injectable()
export class InstancesService {
  constructor(
    @InjectRepository(Instance)
    private instanceRepository: Repository<Instance>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createInstanceInput: CreateInstanceInput) {
    const owner = await this.userRepository.findOne(
      createInstanceInput.ownerId,
    );
    const newInstance = this.instanceRepository.create({
      ...createInstanceInput,
      owner,
    });
    return this.instanceRepository.save(newInstance);
  }

  async findAllByOwner(ownerId: string) {
    return this.instanceRepository.find({ where: { owner: ownerId } });
  }

  async findOne(id: string) {
    const instance = await this.instanceRepository.findOne(id);
    if (!instance) {
      throw new NotFoundException('Instance not found');
    }
    return instance;
  }

  async update(id: string, updateInstanceInput: UpdateInstanceInput) {
    const owner = await this.userRepository.findOne(
      updateInstanceInput.ownerId,
    );
    const findedInstance = await this.findOne(id);
    return this.instanceRepository.save({
      ...findedInstance,
      ...updateInstanceInput,
      owner,
    });
  }

  async remove(id: string): Promise<void> {
    const findedInstance = await this.findOne(id);
    const deletedInstance = await this.instanceRepository.delete(
      findedInstance,
    );
    if (!deletedInstance) {
      throw new InternalServerErrorException();
    }
  }
}
