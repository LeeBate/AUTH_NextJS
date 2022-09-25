import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../lib/validate'
import { useRouter } from 'next/router';

export default function Register(){

    const [password, setPassword] = useState({ password: false, cpassword: false })
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            username : '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: registerValidate,
        onSubmit
    })
    console.log(formik.errors)

    //onSubmit
    async function onSubmit(values){
        const options = {
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }

        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) router.push('http://localhost:3000')
            })
    }

    return (
        <Layout>
        <Head>
            <title>Register</title>
        </Head>

        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>สมัครสมาชิก</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username ? 'border-rose-600' : ''}`}>
                    <input 
                    type="text"
                    name='Username'
                    placeholder='ชื่อผู้ใช้'
                    className={styles.input_text}
                    {...formik.getFieldProps('username')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>
                
                {/* {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>} */}
                <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    
                    <input 
                    type="email"
                    name='email'
                    placeholder='อีเมล์'
                    className={styles.input_text}
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${password.password ? "text" : "password"}`}
                    name='password'
                    placeholder='รหัสผ่าน'
                    className={styles.input_text}
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setPassword({ ...password, password: !password.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}

                <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${password.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='ยืนยันรหัสผ่าน'
                    className={styles.input_text}
                    {...formik.getFieldProps('cpassword')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setPassword({ ...password, cpassword: !password.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        สมัครสมาชิก
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                คุณมีไอดีอยู่แล้ว? <Link href={'/login'}><a className='text-blue-700'>เข้าสู่ระบบ</a></Link>
            </p>
        </section>
        </Layout>
    )
}