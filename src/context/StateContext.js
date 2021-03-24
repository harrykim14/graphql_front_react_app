import React, { createContext, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_SINGLE_EMPLOYEE } from '../queries';

export const StateContext = createContext();

const StateContextProvider = props => {
    const [name, setName] = useState('');
    const [joinYear, setJoinYear] = useState(2021);
    const [deptName, setDeptName] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [editedId, setEditedId] = useState('');

    const [ 
        getSingleEmployee, // 함수명을 임의로 지정 가능
        { data: dataSingleEmployee, error: errorSingleEmployee }, // fetch시 필요한 데이터를 두번째 인자로 넘김
    ] = useLazyQuery(GET_SINGLE_EMPLOYEE, { fetchPolicy: "network-only"}); // 실행하고자 하는 쿼리와 fetch policy를 지정
                                                                           // network-only 외에도 cache-only, no-cache 등이 있다

    return <StateContext.Provider
        value={{ 
            name,
            setName,
            joinYear,
            setJoinYear,
            deptName,
            setDeptName,
            selectedDept,
            setSelectedDept,
            editedId,
            setEditedId,
            getSingleEmployee,
            dataSingleEmployee,
            errorSingleEmployee,
        }}>
        {props.children}
    </StateContext.Provider>
}

export default StateContextProvider;