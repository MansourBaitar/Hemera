import { HttpService, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectDto, ProjectUpdateDto } from './project.dto';
// import { ExceptionService } from '../exception/exceptions.json';
import { ObjectID } from 'mongodb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: MongoRepository<Project>,
    private httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Inserts a single project into the database.
   * @param project The project object
   */
  async register(project: ProjectDto, files: any) {
    // check if project already exists
    const exists = await this.projectExistsByName(project.owner, project.name);
    if (exists) {
      return {
        code: 'S002',
        title: `project with name '${project.name}' already exists with that name`,
        status: 400,
        type: 'https://support.octape.io/problem/octape/S002',
      };
    }
    let files_array = null;
    try {
      const upload_files = [];
      files.forEach((element) => {
        const options = {
          type: 'project_files',
          user: project.owner,
          name: project.name,
          fileName: element.originalname,
          fileType: element.mimetype,
          file: JSON.stringify(element),
        };
        upload_files.push(options);
      });

      await this.httpService
        .post(`${this.config.get<string>('service.storage')}:8080`)
        .toPromise()
        .then((storage_result) => (files_array = storage_result));
    } catch (error) {
      throw error;
    }

    // insert into database
    const p = new Project();
    p.owner = project.owner;
    p.name = project.name;
    p.description = project.description;
    p.contributors = project.contributors;
    p.status = 'New';
    p.pic = files_array[0];
    p.files = project.files;

    const empty_files = [];
    if (!project.files) {
      p.files = empty_files;
    }

    // save project
    return this.projectRepository.save(p);
  }

  /**
   * Retrieves all registered projects from the database.
   */
  async findAll(owner_id: string) {
    return this.projectRepository.find({
      where: { owner: owner_id },
    });
  }

  /**
   * Retrieves a single project from the database by id.
   * @param id string representation of an object id
   */
  async findById(id: string) {
    const object = await this.projectRepository.findOne(
      ObjectID.createFromHexString(id) as any,
    );
    if (!object)
      throw {
        code: 'S005',
        title: 'unable to find object by id',
        status: 404,
        type: 'https://support.octape.com/problem/octape/S005',
      };
    return object;
  }

  /**
   * Updates a project based on their id.
   * @param id string representatoin of an object id
   * @param update value that needs to be updated
   */
  async update(id: string, update: ProjectUpdateDto, files: any) {
    if (!ObjectID.isValid(id))
      throw {
        code: 'S004',
        title: 'unable to parse string to object id',
        status: 400,
        type: 'https://support.octape.com/problem/octape/S004',
      };
    const mongoId = ObjectID.createFromHexString(id);
    const upload_files = [];

    const projectData = await this.findById(id);
    files.forEach((element) => {
      const options = {
        type: 'project_files',
        user: projectData.owner,
        id: id,
        fileName: element.originalname,
        fileType: element.mimetype,
        file: JSON.stringify(element),
      };
      upload_files.push(options);
    });

    let files_array = null;
    await this.httpService
      .post(
        `${this.config.get<string>('service.storage')}/storage/upload`,
        upload_files,
      )
      .toPromise()
      .then((result) => (files_array = result.data));

    update.files = files_array;
    const result = await this.projectRepository.updateOne(
      { _id: mongoId },
      {
        $set: update,
      },
    );
    if (result.matchedCount === 0)
      throw {
        code: 'S005',
        title: 'unable to find project by id',
        status: 404,
        type: 'https://support.octape.com/problem/octape/S005',
      };
    return result;
  }

  /**
   * Removes a single project from the database based on their id.
   * @param id string representation of an object id
   */
  async remove(id: string) {
    const mongoId = ObjectID.createFromHexString(id);
    const result = await this.projectRepository.deleteOne({
      _id: mongoId,
    });

    if (result.deletedCount === 0)
      throw {
        code: 'S005',
        title: 'unable to find project by id',
        status: 404,
        type: 'https://support.octape.com/problem/octape/S005',
      };
  }

  /**
   * Checks if a project already exists.
   * @param owner id of the user
   * @param name name of the project
   */
  async projectExistsByName(
    owner: string,
    name: string,
  ): Promise<ObjectID | null> {
    const project = await this.projectRepository.findOne({
      owner: owner,
      name: name,
    });
    if (!project) return null;
    return project.id;
  }
}
