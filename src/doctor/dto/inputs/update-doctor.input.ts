import { IsUUID } from 'class-validator';
import { CreateDoctorInput } from './create-doctor.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDoctorInput extends PartialType(CreateDoctorInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;
  
}
