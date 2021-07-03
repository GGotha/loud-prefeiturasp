import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Users from "./Users";

@Entity("opinions")
class Opinions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  upvotes: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Users, (user) => user.id)
  id_user: number;
}

export default Opinions;
