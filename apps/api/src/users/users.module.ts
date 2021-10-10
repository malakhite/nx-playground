import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Link } from './entities/links.entity';

@Module({
	controllers: [UsersController],
	imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Link])],
	providers: [UsersService],
})
export class UsersModule {}
