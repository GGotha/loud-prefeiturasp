import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Opinions, (opinion) => opinion.id)
  @JoinColumn({ name: "id_opinion" })
  id_opinion: number;

  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: "id_user" })
  id_user: number;
}

export default OpinionUpvotes;
