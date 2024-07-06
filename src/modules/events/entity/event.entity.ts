import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attendee } from './attendee.entity';
import { User } from 'src/modules/auth/entity/user.entity';

@Entity({
  name: 'event',
})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'datetime',
  })
  when: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee[];

  @ManyToOne(() => User, (user) => user.organized)
  organizer: User | number;
}
