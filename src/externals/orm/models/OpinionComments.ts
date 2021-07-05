import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Opinions, (opinion) => opinion.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_opinion" })
  id_opinion: number;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "id_user" })
  id_user: number;
}

export default OpinionComments;
