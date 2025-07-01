import React, {useEffect, useState} from 'react';
import usersRepository  from "../repository/usersRepository.js";

const initialState = {
    users : [],
    loading: true,
}

const useUsers = () => {
    const [users, setUsers] = useState(initialState);

    useEffect(() => {
        usersRepository
            .fetchAllUsers()
            .then((response) => {
                setUsers({
                    users: response,
                    loading: false,
                });
            })
            .catch((error) => {
                console.log((error))
                setUsers(prevState => ({...prevState, loading: false}))
            });

    }, []);
    //[] ---> run once on mount


    return users
};

export default useUsers;