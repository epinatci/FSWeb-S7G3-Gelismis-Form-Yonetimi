import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";


function Form() {

    const [errorData, setErrorData] = useState({
        // - [ ] İsim (ismi, soyismi)
        // - [ ] Email
        // - [ ] Şifre
        // - [ ] Kullanım Şartları (Terms of Service) (checkbox)
        // - [ ] Gönder butonu (formu göndermek için).

        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const formSchema = Yup.object().shape({
        name: Yup.string().required("İsim ve Soyisim giriniz."),
        email: Yup.string().email("Geçerli bir email adresi giriniz.").required("Email adresinizi giriniz."),
        password: Yup.string().required("Şifre giriniz.").min(6, "Girdiğiniz şifre en az 6 karakter olmalıdır."),
        terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions")
        // required isn't required for checkboxes.
    });

    const handleChange = (e) => {
        Yup.reach(formSchema, e.target.name)
            .validate(e.target.name)
            .then(setErrorData({ ...errorData, [e.target.name]: "" }))
            .catch((err) => {
                setErrorData({ ...errorData, [e.target.name]: err.errors[0] });
            });
    };

    const handleTerms = (e) => {
        Yup.reach(formSchema, e.target.value)
            .validate(e.target.checked)
            .then(setErrorData({ ...errorData, [e.target.name]: "" }))
            .catch((err) => {
                setErrorData({ ...errorData, [e.target.name]: err.errors[0] });
            });
    };

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    })

    const fromSubmit = (e) => {
        e.preventDefault();
    }

    const formChangeHandler = (e)=>{
        const { type,value,name,checked}=e.target;

        if(type ==="checkbox"){
            setUser({...user,[name]:checked})
            handleTerms(e)
        }
        else{
            setUser([...user,[name]])
            handleChange(e)
        }
    }
    useEffect(()=>{
        console.log(errorData)
    },[errorData])


    return (
        <form onSubmit={fromSubmit}>
            <label htmlFor="nameInput">
                Name Surname
                <input id="nameInput" type="text" name="nameSurname" value={user.name} onChange={formChangeHandler} />
            </label>
            {errorData.name.length > 0 && <p className="error">{errorData.name}</p>}


            <label htmlFor="passwordInput">
                Email
                <input id="emailInput" type="email" name="email" value={user.email} onChange={formChangeHandler} />
            </label>
            {errorData.email.length > 0 && <p className="error">{errorData.email}</p>}


            <label htmlFor="passwordInput">
                Password
                <input id="passwordInput" type="password" name="password" value={user.password} onChange={formChangeHandler} />
            </label>
            {errorData.password.length > 0 && <p className="error">{errorData.password}</p>}

            <label htmlFor="termsInput">
                Do you agree to the terms and conditions?
                <input id="termsInput" type="checkbox" name="terms" />
            </label>

            <button>Submit!</button>
        </form>
    );



}