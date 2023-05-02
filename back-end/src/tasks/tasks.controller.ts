import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req, UseGuards, } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() req : Request , @Body() createTaskDto: CreateTaskDto) {
    console.log(createTaskDto);
    return this.tasksService.createTask(req.user, createTaskDto);
  }
   
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req : Request) {
    return this.tasksService.findAll(req.user);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
