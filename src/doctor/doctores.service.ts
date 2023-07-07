import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorInput, UpdateDoctorInput } from './dto/inputs';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DoctoresService {

  constructor( 
    @InjectRepository(Doctor)
    private readonly doctoresRepository:Repository<Doctor> ){}

  async create(createDoctorInput: CreateDoctorInput): Promise<Doctor>  {
    const newDoctor= this.doctoresRepository.create(createDoctorInput);
    return await this.doctoresRepository.save(newDoctor); 
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctoresRepository.find();
  }

  async findOne(id: string): Promise<Doctor> {
     const Doctor= await  this.doctoresRepository.findOneBy({id});
     if (!Doctor) throw new NotFoundException(`Not found`)
     return Doctor;
  }

  async update(id: string, updateDoctorInput: UpdateDoctorInput): Promise<Doctor> {
    
    const Doctor = await this.doctoresRepository.preload(updateDoctorInput);
    if (!Doctor) throw new NotFoundException(`Not found`)
    return this.doctoresRepository.save(Doctor);

  }

  async remove(id: string): Promise<Doctor> {

    const Doctor= await  this.findOne(id);

     await this.doctoresRepository.update({id:id},{estado:false  });

    // await this.doctoresRepository.remove(Doctor);

    return {...Doctor, id};

  }
}
