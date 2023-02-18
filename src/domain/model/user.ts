import { ulid } from 'ulid';

export class UserModel {
  private constructor(private id: string, private name: string) {}

  get getId(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  /**
   * UserModelを新規作成します
   * @param name
   * @returns
   */
  static create(name: string): UserModel {
    return new this(ulid(), name);
  }

  static reconstruct(id: string, name: string): UserModel {
    return new this(id, name);
  }
}
