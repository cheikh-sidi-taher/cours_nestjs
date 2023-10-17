import { Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Post, Req, Res, UseGuards } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { JwtAuthGurd } from "src/auth/jwt.guard";
import { RolesGuard } from "src/auth/roles/roles.guard";
import { Roles } from "src/auth/roles/roles.decorator";



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
   //get all users
   @Get()
  async findAllUsers(@Res() response) {
    try {
      const users = await this.usersService.findAll();
      if (!users) {
        return response.json({
          status: false,
          message: 'La liste des users est vide'
        });

      } else {
        response.status(HttpStatus.OK).json({
          status: true,
          message: 'la Liste des users a été recupées avec succès',
          data: users
        });

      }
    } catch (error) {
      throw new InternalServerErrorException("Une erreur s'est produite : " + error.message);
    }

  }
 
   
   @Post('login')
   @HttpCode(HttpStatus.OK)
   signIn(@Body() signInDto: Record<string, any>) {
    // console.log(signInDto)
   return this.usersService.signIn(signInDto.userName, signInDto.password);
   }

  //create user
  @Post()
  async create(@Body() user, @Res() response) {
    //return this.usersService.create(user);

    try {
      const u = await this.usersService.create(user);
      if( u){
        response.status(HttpStatus.OK).json({
          status: true,
          message: 'tudent à été cree  avec succèss',
          data:  u
        });
      }
    }catch (error) {
      throw new InternalServerErrorException("Une erreur s'est produite : " + error.message);
    }
  }


  @Roles('admin')
  @UseGuards(JwtAuthGurd,RolesGuard)
  @Get()
  profile(@Req() req, @Res() res){
      return res.status(HttpStatus.OK).json(req.user)
  }
 
}

