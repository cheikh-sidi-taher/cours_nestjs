import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JweStrategy } from './auth/jwt.strategy';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    StudentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test1234',
      database: 'postgres',
      autoLoadEntities:true,
      synchronize: true,
    }),
    AuthModule,
    PassportModule,
    JwtModule.register({secret: 'secret' , signOptions: { expiresIn: '1h'}}),
    UsersModule,
    
    
  ],
  
  controllers: [AppController],
  providers: [AppService,JweStrategy],
})
export class AppModule {}
