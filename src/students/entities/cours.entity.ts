import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Studdent } from "./students.entity";


@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name: string;
    
    @ManyToMany(type=> Studdent,
        student=> student.courses,
        )
        students:Studdent[]
    
}
