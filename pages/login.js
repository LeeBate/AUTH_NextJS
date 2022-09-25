import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css';
import Image from 'next/image'
import {HiAtSymbol, HiFingerPrint} from "react-icons/hi"
import { useState } from 'react';
import {signIn, signOut} from 'next-auth/react'
import {useFormik} from 'formik'
import login_validate from '../lib/validate'
import { useRouter } from 'next/router';

export default function Login(){

    const [password, setPassword] = useState(false);
    const router = useRouter();
    //formik Hook
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validate:login_validate,
        onSubmit
    })

    async function onSubmit(values){
       const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })
        if(status.ok) router.push(status.url)
    }

    //Google handler function
    async function handleGoogleSignin(){
        signIn('google', {callbackUrl: 'http://localhost:3000'})
    }

    return (
        <Layout>

        <Head>
            <title>CALLLAB</title>
        </Head>
        
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>CALLLAB</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
            <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='อีเมล์'
                    className={styles.input_text}
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4 '>
                        <HiAtSymbol size={25}/>
                    </span>
                    
                </div>
                {/* {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : <></>} */}
                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${password ? "text" : "password"}`}
                    name='password'
                    placeholder='รหัสผ่าน'
                    className={styles.input_text}
                    {...formik.getFieldProps('password')}
                    />
                    <span className='icon flex items-center px-4' 
                    onClick={() => setPassword(!password)}>
                        <HiFingerPrint size={25}/>
                    </span>
                </div>
                {/* {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : <></>} */}

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        เข้าสู่ระบบ
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
                    ลงชื่อเข้าใช้ด้วย <Image src={'/assets/google.svg'} width="20" height={20} ></Image>
                    </button>
                </div>
                {/* <div className="input-button">
                    <button type='button' className={styles.button_custom}>
                        Sign In with Github <Image src={'/assets/github.svg'} width={25} height={25}></Image>
                    </button>
                </div> */}
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                หากคุณยังไม่มีบัญชี? <Link href={'/register'}><a className='text-blue-700'>สมัครสมาชิก</a></Link>
            </p>
        </section>

        </Layout>
    )
}