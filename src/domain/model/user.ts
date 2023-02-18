import { ulid } from 'ulid';

export class UserModel {
  constructor(readonly id: string, readonly name: string) {
    this.id = id;
    this.name = name;
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
