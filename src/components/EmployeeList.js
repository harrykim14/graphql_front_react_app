import React, { useContext } from 'react'
import { StateContext } from '../context/StateContext'
import { useMutation } from '@apollo/client';
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from '../queries';

import styles from './EmployeeList.module.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const EmployeeList = ({ dataEmployees }) => {

    const {
        setName,
        setJoinYear,
        setSelectedDept,
        setEditedId,
        dataSingleEmployee,
        getSingleEmployee, 
    } = useContext(StateContext)

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }]
    });

    return (
        <>
            <h3>Employee List</h3>
            <ul className={styles.employeeList_list}>
                {dataEmployees && dataEmployees.allEmployees && 
                dataEmployees.allEmployees.edges.map(employee => (
                    <li className={styles.employeeList_item} key={employee.node.id}>
                        <span>
                            {employee.node.name} {" / "}
                            {employee.node.joinYear} { " / "}
                            {employee.node.department.deptName}
                        </span>
                        <div>
                            <DeleteIcon 
                                className={styles.employeeList_delete} 
                                onClick={async () => {
                                    try {
                                        await deleteEmployee({
                                            variables: {
                                                id: employee.node.id,
                                            }
                                        })
                                    } catch (err) {
                                        alert(err.message);
                                    }
                                    
                                    if (employee.node.id === dataSingleEmployee?.employee.id) {
                                        await getSingleEmployee({
                                            variables: {
                                                id: employee.node.id,
                                            }
                                        })
                                    }
                            }}/>
                            <EditIcon 
                                className={styles.employeeList_edit} 
                                onClick={() => {
                                    setEditedId(employee.node.id);
                                    setName(employee.node.name);
                                    setJoinYear(employee.node.joinYear);
                                    setSelectedDept(employee.node.department.id);
                            }}/>
                            <DragIndicatorIcon 
                                className={styles.employeeList_detail}
                                onClick={ async () => {
                                    try {
                                        await getSingleEmployee({
                                            variables: {
                                                id: employee.node.id,
                                            },
                                        })
                                    } catch (err) {
                                        alert(err.message);
                                    }
                            }}/>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default EmployeeList
