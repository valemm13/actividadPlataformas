import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
@Entity('users')

export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'float' })
  height: number;  

}
