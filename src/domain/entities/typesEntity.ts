import { Properties } from "./propertiesEntity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity("types")
export class Types {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Properties)
  @JoinTable()
  properties: Properties[];
}
