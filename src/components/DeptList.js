import React, { useContext } from 'react'
import { StateContext } from '../context/StateContext';
import { useMutation } from '@apollo/client';
import { CREATE_DEPT, DELETE_DEPT, GET_DEPTS, GET_EMPLOYEES } from '../queries';

import styles from'./DeptList.module.css';
import DeleteIcon from '@material-ui/icons/Delete';



const DeptList = ({ dataDepts }) => {
    const {
        deptName,
        setDeptName
    } = useContext(StateContext)
    const [createDept] = useMutation(CREATE_DEPT, {
        refetchQueries: [{ query: GET_DEPTS }],
    })
    const [deleteDept] = useMutation(DELETE_DEPT, {
        refetchQueries: [{ query: GET_DEPTS }, { query: GET_EMPLOYEES }],
    })

    const nameChangeEventHandler = (e) => { setDeptName(e.target.value)}
    const buttonEventHandler = async () => {
        try {
            await createDept({
                variables: { deptName: deptName },
            })
        } catch(err) {
            alert(err.message)
        }
        setDeptName('');
    }

    return (
        <>
           <h3>Department List</h3> 
           <input
             className={styles.deptList_input}
             placeholder="New department name"
             type="text"
             value={deptName}
             onChange={nameChangeEventHandler}
           />
           <button
             disabled={!deptName}
             onClick={buttonEventHandler}
           >
            New Dept
           </button>

           <ul className={styles.deptList_list}>
            { dataDepts &&
                dataDepts.allDepartments &&
                dataDepts.allDepartments.edges.map(employee => 
                <li className={styles.deptList_item} key={employee.node.id}>
                    <span>{employee.node.deptName}</span>
                    <div>
                        <DeleteIcon
                            className={styles.deptList_delete}
                            onClick={ async () => {
                                try {
                                    await deleteDept({
                                        variables: {
                                            id: employee.node.id,
                                        }
                                    })
                                } catch (err) {
                                    alert(err.message)
                                }
                        }}/>
                    </div>
                </li>
            )}
            </ul>
        </>
    )
}

export default DeptList
