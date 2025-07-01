import * as api from "../api/usersApi.js"

const usersRepository ={
   fetchAllUsers: async () => {
       return await api.fetchAllUsers()
   },
};

export default usersRepository;