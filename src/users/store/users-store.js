import { loadNextID } from "../use-cases/load-next-id";
import { loadUsersByPage } from "../use-cases/load-users-by-page";


const state = {

    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    const nextPage = state.currentPage + 1;
    const {users, pages} = await loadUsersByPage(nextPage);

    if(users.length === 0) return;
    if(nextPage > pages) return;

    state.currentPage +=1;
    
    state.users = users;
}

const loadPreviousPage = async() => {
    
    if(state.currentPage === 1) return;
    const {users} = await loadUsersByPage(state.currentPage - 1);
    state.users = users;
    state.currentPage -=1;
}

const onUserChange = (updatedUser) => {

    let wasFound = false;
    
    state.users = state.users.map( user => {
        if(user.id === updatedUser.id){
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    if(state.users.length < 10 && !wasFound){
        state.users.push(updatedUser);
    }
}

const reloadPage = async() => {

    const {users} = await loadUsersByPage(state.currentPage);
    console.log(users)
    if(users.length === 0){
        console.log(users+'hola');
        await loadPreviousPage();
        return;
    }
    state.users = users;
}

const getNextId = async () => {
    const nextID = await loadNextID();
    return nextID;
}


export default{
    loadNextPage,
    onUserChange,
    reloadPage,
    loadPreviousPage,
    getNextId,

    /**
    * @returns{User[]}
    */
    getUsers: () => [...state.users],
    /**
    * @returns{Number}
    */
    getCurrentPage: () => state.currentPage,
}