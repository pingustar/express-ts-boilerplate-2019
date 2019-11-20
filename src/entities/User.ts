import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

export interface IUser {
    id?: number;
    name?: string;
    email?: string;
}

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public name?: string;

    @Column()
    public email?: string;

}
