import {getRepository} from 'typeorm';
import {User, IUser} from '../../entities/User';

export interface IUserDao {
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

export class UserDao implements IUserDao {

    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        // TODO
        const all = await getRepository(User).find();
        return all as any;
    }

    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<void> {
        // TODO
        const userRepository = getRepository(User);
        const u = await userRepository.create(user);
        const results = await userRepository.save(u);
        return results as any;
    }

    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
        // TODO
        const userRepository = getRepository(User);
        const u = await userRepository.findOne(user.id);
        if (u) {
            userRepository.merge(u, user);
        }
        const results = await userRepository.save(user);
        return results as any;
    }

    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        // TODO
        const userRepository = getRepository(User);
        const results = await userRepository.delete(id);
        return results as any;
    }
}
