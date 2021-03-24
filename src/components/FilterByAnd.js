import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_AND_EMPLOYEE } from '../queries'

import styles from './FilterByAnd.module.css';
import SearchIcon from '@material-ui/icons/Search'

const FilterByAnd = () => {

    const [searchName, setSearchName] = useState('');
    const [searchJoin, setSearchJoin] = useState(2021);
    const [searchDept, setSearchDept] = useState('');

    const [
        searchAndEmployee, 
        { data: dataSearch, error: errorSearch }
    ] = useLazyQuery(SEARCH_AND_EMPLOYEE, {
        fetchPolicy:"network-only"
    })

    const changeNameInputHandler = e => setSearchName(e.target.value);
    const changeJoinInputHandler = e => setSearchJoin(e.target.value || 0);
    const changeDeptInputHandler = e => setSearchDept(e.target.value);
    const searchEventHandler = async () => {
        await searchAndEmployee({
            variables: {
                name: searchName,
                joinYear: searchJoin === 0 ? null : searchJoin,
                dept: searchDept
            }
        });
        setSearchName('')
        setSearchJoin(2021)
        setSearchDept('')
    }

    return (
        <>
            <h3>Filter by AND Condition</h3>
            <input 
                className={styles.filterByAnd_input}
                placeholder="Type employee name"
                type="text"
                value={searchName}
                onChange={changeNameInputHandler}
            />
            <input 
                className={styles.filterByAnd_input}
                type="number"
                min="0"
                value={searchJoin}
                onChange={changeJoinInputHandler}
            />
            <input 
                className={styles.filterByAnd_input}
                placeHolder="Type deparment name"
                type="text"
                value={searchDept}
                onChange={changeDeptInputHandler}
            />
            <div>
                <SearchIcon
                    className={styles.filterByAnd_search}
                    onClick={searchEventHandler}
                />
            </div>
            <ul className={styles.filterByAnd_list}>
                { errorSearch && errorSearch.message}
                { dataSearch 
                    && dataSearch.allEmployees 
                    && dataSearch.allEmployees.edges.map(employee => 
                    <li className={styles.filterByAnd_item} key={employee.node.id}>
                        {employee.node.name}
                        {" / "}
                        {employee.node.joinYear}
                        {" / "}
                        {employee.node.department.deptName}
                    </li>
                    ) }
            </ul>
        </>
    )
}

export default FilterByAnd
