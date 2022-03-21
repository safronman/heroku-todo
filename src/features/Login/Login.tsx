import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginTC } from './authReducer';
import { AppRootStateType } from '../../app/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginParamsType } from '../../api/todolists-api';


export const Login = () => {

    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            // const errors: Partial<Omit<LoginParamsType, 'captcha' >> = {};
            const errors: Partial<Pick<LoginParamsType, 'password' | 'email' | 'rememberMe' >> = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Пароль обязателен';
            } else if (values.password.length < 3) {
                errors.password = 'Пароль должен быть больше 3 символов';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        // navigate('/')
        return <Navigate to={'/'}/>
    }


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>

                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {
                            formik.touched.email &&
                            formik.errors.email && <div style={{color: 'red'}}>
                                {formik.errors.email}
                            </div>
                        }

                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password
                            && formik.errors.password
                            && <div style={{color: 'red'}}>
                                {formik.errors.password}
                            </div>}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}
