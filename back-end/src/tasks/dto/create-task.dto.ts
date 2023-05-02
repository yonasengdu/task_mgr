import { TaskStatus } from "./task-status-enum";
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    status: TaskStatus;
    @IsOptional()
    @IsString()
    description: string;
}
