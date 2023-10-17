import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthenticate, Role } from './interface/Role';


import {faker} from '@faker-js/faker';
import { AuthenticateDto } from './dto/authentcate.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {

    users = [
        {
            id: faker.datatype.uuid(),
            userName:"cheikh",
            password:"cheikh1234",
            role:Role.Admin
        },

        {
            id: faker.datatype.uuid(),
            userName:"messi",
            password:"messi1234",
            role:Role.User
        }
    ]

    // check in user

    authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
        const user = this.users.find(
            (u)=>
            u.userName === authenticateDto.userName &&
            u.password === authenticateDto.password,
 
        );

        if(!user) throw new NotFoundException('Invalid');
        const token = sign({...user}, 'secrete');

        return { token , user}
    }
}
