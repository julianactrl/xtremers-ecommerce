import axios from 'axios';
import React from 'react'
import ResetSteps from './reset_steps/index';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swals from './../../utils/swals';
import { useRef } from 'react';

export const ResetPassword = () => {

    const history = useHistory();

    const [data, setData] = useState({
        email: '',
        reset_code: '',
        step: 1,
    })
    const [loading, setLoading] = useState(false);
    const buttonRef = useRef(null);

    const fireTick = () => {
        buttonRef.current.classList.add('btn-tick');
        buttonRef.current.addEventListener('animationend', () => {
            buttonRef.current.classList.remove('btn-tick');
        }, { once: true })
    }

    const handleSubmits = (input, _step) => {
        switch (_step) {
            case 1:
                setLoading(true);
                axios.post(`http://localhost:3001/users/reset/password`, { email: input })
                    .then(res => {
                        if (res.data.ok) {
                            fireTick()
                            setData({
                                ...data,
                                email: input,
                                step: 2
                            });
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 404) {
                            swals.FIRE('warning', 'Please enter the email linked to your account')
                        } else {
                            swals.FIRE('warning', 'Oops, something went wrong');
                        }
                    })
                    .finally(() => setLoading(false));
                break;
            case 2:
                setLoading(true);
                axios.post(`http://localhost:3001/users/reset/verification`, { email: data.email, reset_code: input.toString(), step: '1' })
                    .then(res => {
                        if (res.data.ok) {
                            fireTick();
                            setData({
                                ...data,
                                reset_code: input,
                                step: 3
                            })
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 400) {
                            swals.FIRE('warning', 'El dato que ha introducido no es valido')
                        } else {
                            swals.FIRE('warning', 'Oops, something went wrong');
                        }
                    })
                    .finally(() => setLoading(false));
                break;
            case 3:
                setLoading(true);
                axios.post(`http://localhost:3001/users/reset/verification`, { email: data.email, reset_code: data.reset_code, step: '2', password: input })
                    .then(res => {
                        if (res.data.ok) {
                            swals.CONFIRMOK('Success', 'Password changed correctly')
                                .finally(() => {
                                    history.push('/');
                                })
                        }
                    })
                    .catch(() => {
                        swals.FIRE('warning', 'Oops, something went wrong');
                    })
                    .finally(() => setLoading(false));
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div>

                <ResetSteps handleSubmit={handleSubmits} step={data.step} loading={loading} buttonRef={buttonRef} />
            </div>
        </>
    )
}


