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

@Entity("opinion_upvotes")
class OpinionUpvotes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upvote: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Opinions, (opinion) => opinion.id)
  id_opinion: number;

  @OneToMany(() => Users, (user) => user.id)
  id_user: number;
}

export default OpinionUpvotes;
