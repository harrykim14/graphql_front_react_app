import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { useLazyQuery } from '@apollo/client';
import {
    PAGINATE_FIRST_EMPLOYEE,
    PAGINATE_LAST_EMPLOYEE,
    PAGINATE_MORE_EMPLOYEE
} from '../queries';

import styles from './Pagenation.module.css';
import { Grid } from  '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const NUM_PAGE = 3;
const Pagination = () => {

    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(0);
    const [
        paginateFirst, 
        { data: dataFirst, error: errorFirst }
    ] = useLazyQuery(
            PAGINATE_FIRST_EMPLOYEE, 
            {fetchPolicy:"cache-and-network"}, // 서버 측에서 캐쉬가 자동 업데이트되므로서 서버쪽 캐시를 보고 업데이트함
    )

    const [
        paginateLast, 
        { data: dataLast, error: errorLast }
    ] = useLazyQuery(
            PAGINATE_LAST_EMPLOYEE, 
            {fetchPolicy:"cache-and-network"},
    )

    const {
        data: dataPages,
        error: errorPages,
        loading: loadingPages,
        fetchMore,
    } = useQuery(PAGINATE_MORE_EMPLOYEE, {
        variables: { first: NUM_PAGE, after: null },
        fetchPolicy: "cache-and-network",
    })

    const firstChangeHandler = e => setFirst(e.target.value);
    const firstSearchHandler = async () =>  {
        await paginateFirst({
            variables: {
                first: first,
            }
        })
        setFirst(0);
    }
    const lastChangeHandler = e => setLast(e.target.value);
    const lastSearchHandler = async () =>  {
        await paginateLast({
            variables: {
                last: last,
            }
        })
        setLast(0);
    }
    const loadMoreEventHandler = () => {
        fetchMore({
            variables: {
                first: NUM_PAGE,
                after: dataPages.allDepartments.pageInfo.endCursor || null,
            },
            updateQuery: (prevLoad, { fetchMoreResult }) => {
                fetchMoreResult.allDepartments.edges = [
                    ...prevLoad.allDepartments.edges,
                    ...fetchMoreResult.allDepartments.edges,
                ];
                return fetchMoreResult;
            }
        })
    }

    if (loadingPages) return <h1>Loading from server...</h1>;

    return (
        <>
            <Grid container>
                <Grid item xs={4}>
                    <h3>Paginate by First</h3>
                    <input 
                        type="number"
                        min="0"
                        value={first}
                        onChange={firstChangeHandler}
                    />
                    <div>
                        <SearchIcon
                            className={styles.pagination_search}
                            onClick={firstSearchHandler}
                        />
                    </div>
                    <ul className={styles.pagenation_list}>
                        { errorFirst && <h3>{errorFirst.message}</h3> }
                        { dataFirst 
                            && dataFirst.allEmployees
                            && dataFirst.allEmployees.edges.map(employee => 
                                <li className={styles.pagenation_item} key={employee.node.id}>
                                    {employee.node.name}
                                    {" / "}
                                    {employee.node.joinYear}
                                    {" / "}
                                    {employee.node.department.deptName}
                                </li>
                        )} 
                    </ul>
                </Grid>
                <Grid item xs={4}>
                    <h3>Paginate by Last</h3>
                    <input 
                        type="number"
                        min="0"
                        value={last}
                        onChange={lastChangeHandler}
                    />
                    <div>
                        <SearchIcon
                            className={styles.pagination_search}
                            onClick={lastSearchHandler}
                        />
                    </div>
                    <ul className={styles.pagenation_list}>
                        { errorLast && <h3>{errorLast.message}</h3> }
                        { dataLast
                            && dataLast.allEmployees
                            && dataLast.allEmployees.edges.map(employee => 
                                <li className={styles.pagenation_item} key={employee.node.id}>
                                    {employee.node.name}
                                    {" / "}
                                    {employee.node.joinYear}
                                    {" / "}
                                    {employee.node.department.deptName}
                                </li>
                        )} 
                    </ul>
                </Grid>
                <Grid item xs={4}>
                    <h3>Load More...</h3>
                    <ul>
                        { errorPages && <h3>{ errorPages.message }</h3>}
                        { dataPages 
                            && dataPages.allDepartments
                            && dataPages.allDepartments.edges.map(employee => (
                                <li className={styles.pagenation_item} key={employee.node.id}>
                                    {employee.node.deptName}
                                </li>
                        ))}
                    </ul>
                    { dataPages.allDepartments.pageInfo.hasNextPage 
                        && (
                            <button
                                onClick={loadMoreEventHandler}
                            >Load more</button>
                        )}
                </Grid>
            </Grid>
        </>
    )
}

export default Pagination
