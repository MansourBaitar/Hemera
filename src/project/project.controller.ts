import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto, ProjectUpdateDto } from './project.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('/projects')
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Get('/all/:id')
  async findAll(@Param('id') id: string) {
    return await this.service.findAll(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files[]'))
  async register(@Body() project: ProjectDto, files: any) {
    return await this.service.register(project, files);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const project = await this.service.findById(id);
    return project;
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files[]'))
  async updateById(
    @Param('id') id: string,
    @Body() updateDto: ProjectUpdateDto,
    @UploadedFiles() files: any,
  ) {
    await this.service.update(id, updateDto, files);
  }

  @Delete(':id')
  async removeById(@Param('id') id: string) {
    await this.service.remove(id);
  }
}
