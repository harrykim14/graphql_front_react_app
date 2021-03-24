import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_EMPLOYEE } from '../queries';
import styles from './FilterByName.module.css';
import SearchIcon from '@material-ui/icons/Search';

const FilterByName = () => {
    const [searchByName, setSearchByName] = useState('');
    const [
        searchEmployee, 
        { data : dataSearch, error: errorSearch, }
    ] = useLazyQuery(SEARCH_EMPLOYEE, {
        fetchPolicy:"network-only",
    });
    const inputHandler = e => setSearchByName(e.target.value);
    const clickEventHandler = async () => {
        await searchEmployee({
            variables: { name: searchByName},
        })
        setSearchByName('');
    }
    return (
        <>
          <h3>Filter by employee name</h3> 
          <input
            placeholder="Type employee name"
            type="text"
            value={searchByName}
            onChange={inputHandler}
          />
          <div>
            <SearchIcon
                className={styles.filterByName_search}
                onClick={clickEventHandler}
            />
          </div>
          <ul className={styles.filterByName_list}>
            { errorSearch && <h3>{errorSearch.message}</h3>}
            { dataSearch 
                && dataSearch.allEmployees 
                && dataSearch.allEmployees.edges.map(employee => (
                    <li className={styles.filterByName_item} key={employee.node.id}>
                        {employee.node.name}
                        {" / "}
                        {employee.node.joinYear}
                        {" / "}
                        {employee.node.department.deptName}
                    </li>
                ))}
          </ul>
        </>
    )
}

export default FilterByName
