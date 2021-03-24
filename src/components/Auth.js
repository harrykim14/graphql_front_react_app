import React, { useState, useEffect } from 'react'
import { GET_TOKEN, CREATE_USER } from '../queries';
import { useMutation } from '@apollo/client'
import jwtDecode from 'jwt-decode';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';

import styles from './Auth.module.css'

const Auth = () => {
    // input form용
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // mutation 실행용
    const [getToken] = useMutation(GET_TOKEN); 
    const [createUser] = useMutation(CREATE_USER);
    // login <-> regist 변경용
    const [isLogin, setIsLogin] = useState(true);
    
    // localstorage에 저장한 토큰의 유효기간을 판별하여 유효기간이 지났다면 삭제
    useEffect(() => {
        if (localStorage.getItem("token")) {
            const decodedToken = jwtDecode(localStorage.getItem("token"));
            if (decodedToken.exp * 1000 < Date.now()) { // Date.now는 ms단위이지만 token exp값은 s값이므로 1000 곱해주기
                localStorage.removeItem("token")
            } else {
                window.location.href = "/employees";
            }
        }
    }, [])

    const authUser = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                const result = await getToken({
                    variables: {username: username, password: password},
                });
                localStorage.setItem("token", result.data.tokenAuth.token);
                result.data.tokenAuth.token && (window.location.href ="/employees");
            } catch (err) {
                alert(err.message);
            }
        } else {
            try {
                await createUser({
                    variables: {username: username, password: password},
                })
                // 이후 자동 로그인 (로그인과 동일)
                const result = await getToken({
                    variables: {username: username, password: password},
                });
                localStorage.setItem("token", result.data.tokenAuth.token);
                result.data.tokenAuth.token && (window.location.href ="/employees");
            } catch (err) {
                alert(err.message);
            }
        }
    }

    return (
        <div className={styles.auth}>
            <form onSubmit={authUser}>
                <div className={styles.auth_input}>
                    <label>UserName: </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className={styles.auth_input}>
                    <label>Password </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit">
                    {isLogin ? "Login with JWT" : "Create new user"}
                </button>

                <div>
                    <FlipCameraAndroidIcon
                        className={styles.auth_toggle}
                        onClick={() => setIsLogin(!isLogin)}
                    />
                </div>
            </form>
        </div>
    )
}

export default Auth;