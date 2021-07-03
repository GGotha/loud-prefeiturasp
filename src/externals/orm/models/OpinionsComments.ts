import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Opinions from "./Opinions";
import Users from "./Users";

@Entity("opinion_comments")
class OpinionComments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Opinions, (opinion) => opinion.id)
  id_opinion: number;

  @OneToMany(() => Users, (user) => user.id)
  id_user: number;
}

export default OpinionComments;
