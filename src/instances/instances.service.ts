import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstanceInput } from './dto/create-instance.input';
import { UpdateInstanceInput } from './dto/update-instance.input';
import { Instance } from './entities/instance.entity';

@Injectable()
export class InstancesService {
  constructor(
    @InjectRepository(Instance)
    private instanceRepository: Repository<Instance>,
  ) {}

  async create(createInstanceInput: CreateInstanceInput) {
    const newInstance = this.instanceRepository.create(createInstanceInput);
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
    const findedInstance = await this.findOne(id);
    return this.instanceRepository.save({
      ...findedInstance,
      ...updateInstanceInput,
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
