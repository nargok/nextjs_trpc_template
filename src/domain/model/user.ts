import { ulid } from 'ulid';

export class User {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = ulid();
    this.name = name;
  }
}
