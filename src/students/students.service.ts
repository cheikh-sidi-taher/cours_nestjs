import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Studdent } from './entities/students.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { Course } from './entities/cours.entity';


@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Studdent)
    private readonly studentRepository: Repository<Studdent>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) { }

  async findAll(): Promise<Studdent[]>{
    return this.studentRepository.find(
      {
        relations: ['courses']
      }
    );

  }

  async findOne(id: number): Promise<Studdent> {
    const student = this.studentRepository.findOne({
      where: { id }
    });
    return student;

  }

  // create
  async create(@Body() createStudentDto: CreateStudentDto) {
    const courses = await Promise.all(
      createStudentDto.courses.map(x => this.preloadCourseByName(x))
    );
    const student = this.studentRepository.create({
      ...createStudentDto,
      courses
    })
    return this.studentRepository.save(student);
  }

  //update
  async update(id: number, updateStudentDto: UpdateStudentDto) {

    const courses = await updateStudentDto.courses && (
      await Promise.all(
        updateStudentDto.courses.map(x => this.preloadCourseByName(x))
      )
    )
    const updateStudent = await this.studentRepository.preload({
      id: +id,
      ...updateStudentDto,
      courses
    });

  }

  
  async remove(id: number){
    await this.studentRepository.delete(id)

  }


  // get function by name 

  private async preloadCourseByName(name: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { name }
    })
    if (course) {
      return course
    }

    return this.courseRepository.create({ name });
  }







}
