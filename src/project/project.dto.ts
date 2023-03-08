export class ProjectDto {
  owner: string;
  name: string;
  description: string;
  contributors: string[];
  pic?: string;
  files?: string[];
}

export class ProjectUpdateDto {
  name?: string;
  description?: string;
  contributors?: string[];
  status?: string;
  pic?: string;
  files?: string[];
}
