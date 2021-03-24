import React, { useContext } from 'react'
import { StateContext } from '../context/StateContext';
import styles from './EmployeeCreate.module.css';
import { useMutation } from '@apollo/client';
import { CREATE_EMPLOYEE, GET_EMPLOYEES, UPDATE_EMPLOYEE } from '../queries'

const EmployeeCreate = ({ dataDepts }) => {

    const {
        name,
        setName,
        joinYear,
        setJoinYear,
        selectedDept,
        setSelectedDept,
        editedId,
        setEditedId,
    } = useContext(StateContext);

    const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }], // 추가한 후에 다시 re-fetch 해옴으로써 갱신된 데이터를 받아오기
    })

    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
    })

    const selectOption = dataDepts?.allDepartments.edges.map(dept => (
        <option key={dept.node.id} value={dept.node.id}>
            {dept.node.deptName}
        </option>
    ))

    return (
        <>
        <div>
            <input
                className={styles.employeeCreate_input}
                placeholder="employee name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className={styles.employeeCreate_input}
                placeholder="year of join"
                type="number"
                value={joinYear}
                onChange={(e) => setJoinYear(e.target.value)}
            />        
        </div>
        <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
        >
            <option value="">select</option>
            {selectOption}
        </select>
        <button 
            disabled={!selectedDept || !name || !joinYear}
            className={styles.employeeCreate_btn}
            onClick={
                editedId 
                
                ? async () => {
                    try {
                        await updateEmployee({
                            variables: {
                                id: editedId,
                                name: name,
                                joinYear: joinYear,
                                department: selectedDept
                            }
                        })
                    } catch (err) {
                        alert(err.message)
                    }
                    setEditedId("");
                    setName("")
                    setJoinYear(2021)
                    setSelectedDept("")
                }

                : async() => {
                    try {
                        await createEmployee({
                            variables: {
                                name: name,
                                joinYear: joinYear,
                                department: selectedDept,
                            }
                        })
                    } catch (err) {
                        alert(err.message)
                    }
                    setName("")
                    setJoinYear(2021)
                    setSelectedDept("")
                }

            }
        >
            { editedId ? "Update" : "Create" }
        </button>
        </>
    )
}

export default EmployeeCreate
