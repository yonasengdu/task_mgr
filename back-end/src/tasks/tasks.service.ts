import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
   constructor(private  prisma: PrismaService) {}


  async createTask(user : any, createTaskDto: CreateTaskDto) {
    const newTask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        status: createTaskDto.status,
        userId: user.id
      },
    });
    return newTask;
    
  }

  async findAll(user:any) {
    const allTasks = await this.prisma.task.findMany(
      {where: {userId: user.id}}
  
    );
    return allTasks;
  }

  async findOne(id: number) {
    const oneTask = await this.prisma.task.findUnique({
      where: { id : id},
  }
    
    ); 
    return oneTask;
  }


  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const oneTask = await this.prisma.task.findUnique({
      where: { id : id},
  }
  ); 
    if (oneTask == undefined || null ) {
      throw new ForbiddenException(`Task with id ${id} not found`);
    } 
    const updatedTask = await this.prisma.task.update({
      where: {id : id},
      data: {
        status: updateTaskDto.status,
        name: updateTaskDto.name,
        description: updateTaskDto.description, 
      }
      },
    ); 
    
  }
 



  async remove(id: number) {
    const Task = await this.prisma.task.findUnique({
      where: {id : id},
  } 
  ); 
    if (Task == undefined || null ) {
      throw new ForbiddenException(`Task with id ${id} not found`);
    }  else {
    const deletedTask = await this.prisma.task.delete({
      where: {id : id},
    
  },
    );
    return deletedTask;
}
  }




}