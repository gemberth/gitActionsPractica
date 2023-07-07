import { Module } from '@nestjs/common';
import { DoctoresService } from './doctores.service';
import { DoctoresResolver } from './doctores.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';

@Module({
  providers: [DoctoresResolver, DoctoresService],
  imports:[
    TypeOrmModule.forFeature([Doctor])
  ]
})
export class DoctoresModule {}
