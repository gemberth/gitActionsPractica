import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { DoctoresService } from './doctores.service';
import { Doctor } from './entities/doctor.entity';
import { UpdateDoctorInput, CreateDoctorInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Doctor)
export class DoctoresResolver {
  constructor(private readonly doctoresService: DoctoresService) {}

  @Mutation(() => Doctor)
  async createDoctor(@Args('createDoctorInput') createDoctorInput: CreateDoctorInput)
  :Promise<Doctor> {
    return this.doctoresService.create(createDoctorInput);
  }

  @Query(() => [Doctor], { name: 'doctors' })
  async findAll():Promise<Doctor[]> {
    return this.doctoresService.findAll();
  }

  @Query(() => Doctor, { name: 'doctor' })
  findOne(@Args('id', { type: () => ID}, ParseUUIDPipe ) id: string): Promise<Doctor> {
    return this.doctoresService.findOne(id);
  }

  @Mutation(() => Doctor)
  updateDoctor(@Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput): Promise<Doctor> {
    return this.doctoresService.update(updateDoctorInput.id, updateDoctorInput);
  }

  @Mutation(() => Doctor)
  removeDoctor(@Args('id', { type: () => ID }) id: string): Promise<Doctor> {
    return this.doctoresService.remove(id);
  }
}
