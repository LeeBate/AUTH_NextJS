export default function login_validate(values) {
  let errors = {};
  //email
  if (!values.email) {
    errors.email = "จำเป็นต้องใส่อีเมล";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "ที่อยู่อีเมลไม่ถูกต้อง";
  }
  //password
  if (!values.password) {
    errors.password = "จำเป็นต้องใส่รหัสผ่าน";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "ต้องการรหัสผ่าน 6-20 ตัวอักษร";
  }else if(values.password.includes(" ")){
    errors.password = "รหัสผ่านไม่สามารถมีช่องว่างได้"
  }
  return errors;
}

export function registerValidate(values){
    const errors = {};

    if(!values.username){
        errors.username = "จำเป็นต้องใส่ชื่อผู้ใช้";
    }else if(values.username.includes(" ")){
        errors.username = "ชื่อผู้ใช้ไม่สามารถมีช่องว่างได้!"
    }

    if (!values.email) {
        errors.email = 'จำเป็นต้องใส่อีเมล';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'ที่อยู่อีเมลไม่ถูกต้อง';
    }

       // validation for password
       if(!values.password){
        errors.password = "จำเป็นต้องใส่รหัสผ่าน";
    } else if(values.password.length < 6 || values.password.length > 20){
        errors.password = "ต้องการรหัสผ่าน 6-20 ตัวอักษร";
    } else if(values.password.includes(" ")){
        errors.password = "รหัสผ่านไม่สามารถมีช่องว่างได้";
    }

    // validate confirm password
    if(!values.cpassword){
        errors.cpassword = "จำเป็นต้องยืนยันรหัสผ่าน";
    } else if(values.password !== values.cpassword){
        errors.cpassword = "รหัสผ่านไม่ตรงกัน";
    } else if(values.cpassword.includes(" ")){
        errors.cpassword = "รหัสผ่านไม่สามารถมีช่องว่างได้";
    }

    return errors;
}
 