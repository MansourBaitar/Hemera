import { Entity, ObjectIdColumn, Column, Index } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Observable } from 'rxjs';

@Entity({ name: 'project' })
export class Project {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  owner: string;

  @Column()
  pic?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  contributors: string[];

  @Column()
  status: string;

  @Column()
  files: string[];
}
