import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserRoleEnum } from "@domain/enums";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "enum", enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Column()
  password: string;
}
