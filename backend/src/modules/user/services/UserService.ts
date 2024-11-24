import {UserRepository} from "../repositories/UserRepository";

export class UserService {
    private  userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async registerUser(userData: {id: string; username: string; email: string; password: string;}){
        return this.userRepository.createUser(userData);
    }

    public async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }

    public async getUserByUsername(username: string){
        return this.userRepository.getUserByUsername(username);
    }
}
