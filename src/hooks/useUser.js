import { useContext } from 'react';
import { userDataContext } from 'contexts';

const useUserData = () => {
    return useContext(userDataContext);
};

export default useUserData;