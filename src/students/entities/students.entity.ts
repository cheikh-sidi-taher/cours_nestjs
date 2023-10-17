import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./cours.entity";

@Entity()
export class Studdent{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name: string;
    @Column()
    age: number;
    @Column('json',{nullable:true})
    adres:string[];
    @JoinTable()
    @ManyToMany(type=> Course,
        course => course.students,{cascade:true}
        )
        courses:Course[]

    }