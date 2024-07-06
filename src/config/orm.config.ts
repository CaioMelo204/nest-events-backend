import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Profile } from 'src/modules/auth/entity/profile.entity';
import { User } from 'src/modules/auth/entity/user.entity';
import { Attendee } from 'src/modules/events/entity/attendee.entity';
import { Event } from 'src/modules/events/entity/event.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSERNAME,
    password: process.env.BDPASS,
    database: process.env.DBNAME,
    entities: [Event, Attendee, User, Profile],
    synchronize: true,
  }),
);
