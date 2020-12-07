import { getRepository } from "typeorm";
import path from "path";
import fs from "fs";

import uploadConfig from "../config/upload";
import User from "../models/User";

interface RequestDTO{
    user_id:string,
    avatarFileName: string,
}

class UpdateUserAvatarService{
    public async execute({ user_id, avatarFileName }: RequestDTO ): Promise<User>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if((!user)){
            throw new Error('Permission denied.');
        }

        if(user.avatar) {//se já houver um avatar existente
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        
        }

        user.avatar = avatarFileName;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;