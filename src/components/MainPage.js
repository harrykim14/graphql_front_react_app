import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_EMPLOYEES, GET_DEPTS } from '../queries';
import jwtDecode from 'jwt-decode';

import EmployeeList from './EmployeeList';
import EmployeeCreate from './EmployeeCreate';
import EmployeeDetails from './EmployeeDetails';
import DeptList from './DeptList';
import FilterByName from './FilterByName';
import FilterByAnd from './FilterByAnd';
import Pagination from './Pagination';

import styles from './MainPage.module.css';
import { Grid } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const MainPage = () => {

    const {
        loading: loadingEmployees,
        data: dataEmployees,
        error: errorEmployees,
    } = useQuery(GET_EMPLOYEES)

    const { 
        loading: loadingDepts,
        data: dataDepts,
        error: errorDepts,
    } = useQuery(GET_DEPTS)

    useEffect(() => {
        if(localStorage.getItem('token')){
            const decodedToken = jwtDecode(localStorage.getItem('token'));
            if (decodedToken.exp * 1000 < Date.now())
                localStorage.removeItem('token')
        } else {
            window.location.href = '/';
        }
    }, [errorEmployees, errorDepts])


    if (loadingEmployees || loadingDepts) {
        return <h1>Now loading from server...</h1>
    } else if (errorEmployees || errorDepts) {
        return (
            <>
                <h1>Employee data fetch error: {errorEmployees && errorEmployees.message}</h1>
                <h1>Department data fetch error: {errorDepts && errorDepts.message}</h1>
            </>
        )
    }

    return (
        <div className={styles.mainPage}>
            <h1>GraphQL Lesson
                <ExitToAppIcon 
                    className={styles.mainPage_out}
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = '/';
                    }}
                />
            </h1>
            <EmployeeCreate dataDepts={dataDepts}/>
            <Grid container>
                <Grid item xs={5}>
                    <EmployeeList dataEmployees={dataEmployees}/>
                </Grid>
                <Grid item xs={4}>
                    <EmployeeDetails/>
                </Grid>
                <Grid item xs={3}>
                    <DeptList dataDepts={dataDepts}/>                    
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={2}>
                    <FilterByName />
                </Grid>
                <Grid item xs={3}>
                    <FilterByAnd />
                </Grid>
                <Grid item xs={7}>
                    <Pagination />
                </Grid>
            </Grid>
        </div>
    )
}

export default MainPage
