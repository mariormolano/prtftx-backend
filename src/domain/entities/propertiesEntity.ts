import { typeOptionEnum } from "@domain/enums";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Types } from "./typesEntity";

@Entity("properties")
export class Properties {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255 })
  typeValue: string;

  @Column({ type: "enum", enum: typeOptionEnum, default: typeOptionEnum.TEXT })
  typeOption: typeOptionEnum;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Types, (type) => type.properties, { onDelete: "CASCADE" })
  types: Types;
}
