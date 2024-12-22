


export const loadNextID = async () => {
   
    const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=1`;
    const res = await fetch(url);
    const data = await res.json();
    const id = data.items+1;
    
    return String(id);
}