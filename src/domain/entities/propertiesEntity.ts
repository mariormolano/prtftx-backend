import { valueEnum } from "@domain/enums";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Types } from "./typesEntity";

@Entity("properties")
export class Properties {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "enum", enum: valueEnum, default: valueEnum.TEXT })
  value: valueEnum;

  @CreateDateColumn()
  createdAt: Date;
}
