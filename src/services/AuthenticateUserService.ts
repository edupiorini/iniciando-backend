import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken'

import authConfig from '../config/auth';
import User from "../models/User";

interface RequestDTO {
    email: string,
    password: string,
}

interface ResponseDTO {
    user: User,
    token: string,
}

class AuthenticateUserService {

    public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new Error('Invalid e-mail or password specified.');
        }

        // user.password -> senha criptografada
        // password -> senha nao criptografada

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Invalid e-mail or password specified.');
        }

        // usuario 
        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token }
    }

}

export default AuthenticateUserService;