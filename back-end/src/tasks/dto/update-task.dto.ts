import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from './task-status-enum';
import {   IsOptional, IsString } from 'class-validator'

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    status: TaskStatus;
    @IsOptional()
    @IsString()
    description: string;
}
