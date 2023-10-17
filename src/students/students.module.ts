import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studdent } from './entities/students.entity';
import { Course } from './entities/cours.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Studdent,Course])],
    controllers: [StudentsController],
    providers: [StudentsService],
})
export class StudentsModule {
    
}
