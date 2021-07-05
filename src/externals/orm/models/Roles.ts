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
import Users from "./Users";

@Entity("roles")
class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne(() => Users, (user) => user.id_role)
  // @JoinColumn({ name: "id" })
  // : number;
  // @OneToMany(() => Users, (user) => user.id_role)
  // @JoinColumn()
  //
  // user: number;
}

export default Roles;
