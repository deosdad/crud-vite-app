import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { userModerToLocalHost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user"
import usersStore from "../store/users-store";
/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async(userLike) => {

    const user = new User(userLike);

    if(!user.firstName || !user.lastName) throw 'First & Last Name are required';
    
    const userToSave = userModerToLocalHost(user);
    
    let userUpdated;

    if(user.id){
        userUpdated = await updateUser(userToSave);
    }else{
        userToSave.id = await usersStore.getNextId();
        userUpdated = await createUser(userToSave)
    }
    
    return localhostUserToModel(userUpdated);
}

/**
 * @param {Like<User>} user 
 */
const createUser = async(user) =>{

    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    
    return newUser;
}

/**
 * @param {Like<User>} user 
 */
const updateUser = async(user) =>{

    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    const updated = await res.json();
    
    return updated;
}
