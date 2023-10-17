import { Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, Patch, Post, Res } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';


@Controller('students')
export class StudentsController {

  constructor(private studentService: StudentsService) { }
// get student list []
  @Get()
  async findAllStudent(@Res() response) {
    try {
      const students = await this.studentService.findAll();
      if (!students) {
        return response.json({
          status: false,
          message: 'La liste des students est vide'
        });

      } else {
        response.status(HttpStatus.OK).json({
          status: true,
          message: 'la Liste des students a été recupées avec succès',
          data: students
        });

      }
    } catch (error) {
      throw new InternalServerErrorException("Une erreur s'est produite : " + error.message);
    }

  }
 // get student by id
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() response) {

    try {
      const student = await this.studentService.findOne(id);
      if (!student) {
        return response.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: 'Aucun student n\'est associé avec cet identifiant.'
        });
      } else {
        response.status(HttpStatus.OK).json({
          status: true,
          message: 'student existante',
          data: student
        });

      }
    } catch (error) {
      throw new InternalServerErrorException("Une erreur s'est produite : " + error.message);
    }
  }



  //create student

  @Post()
  async create(@Body() createStudentDTO: CreateStudentDto, @Res() response) {
    try {
    const student = await this.studentService.create(createStudentDTO);
    if(student){
      response.status(HttpStatus.OK).json({
        status: true,
        message: 'tudent à été cree  avec succèss',
        data: student
      });
    }
  }catch (error) {
    throw new InternalServerErrorException("Une erreur s'est produite : " + error.message);
  }
  }


  // update student
  @Patch(':id')
  async update(@Param('id') id:number , @Body() updateStudentDTO: UpdateStudentDto, @Res() response) {
    //return this.studentService.update(id, updateStudentDTO)

    const student = await this.studentService.findOne(id);
    const updateStudent = await this.studentService.update(id, updateStudentDTO);
    if (!student) {
      return response.status(HttpStatus.NOT_FOUND).json({
        status: false,
        message: 'Aucun student n\'est associé avec cet identifiant.'
      });    
  }else{
    response.status(HttpStatus.OK).json({
      status: true,
      message: 'student à été modifier avec succèss',
      data: updateStudent

  });
  }
}
  // delete student

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() response) {
    try {
    const student = await this.studentService.findOne(id);
    const deleteStudent = await this.studentService.remove(id);
    if (!student) {
      return response.status(HttpStatus.NOT_FOUND).json({
        status: false,
        message: 'Aucun student n\'est associé avec cet identifiant.'
      });
    } else {
      response.status(HttpStatus.OK).json({
        status: true,
        message: 'student à été supprimée avec succèss',
        data: deleteStudent
      });

    }
  }catch (error) {
    throw new InternalServerErrorException("Une erreur s'est produite : " + error.message);
  }
  }


}


