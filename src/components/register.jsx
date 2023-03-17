import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from './api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = ({setShow}) => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [number , setNumber] = useState('')

    const [info , setInfo] = useState([])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // if button enabled with JS hack
    //     const v1 = USER_REGEX.test(user);
    //     const v2 = PWD_REGEX.test(pwd);
    //     if (!v1 || !v2) {
    //         setErrMsg("Invalid Entry");
    //         return;
    //     }
    //     try {
    //         const response = await axios.post(REGISTER_URL,
    //             JSON.stringify({ user, pwd }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    //         // TODO: remove console.logs before deployment
    //         console.log(JSON.stringify(response?.data));
    //         //console.log(JSON.stringify(response))
    //         setSuccess(true);
    //         //clear state and controlled inputs
    //         setUser('');
    //         setPwd('');
    //         setMatchPwd('');
    //     } catch (err) {
    //         if (!err?.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response?.status === 409) {
    //             setErrMsg('Username Taken');
    //         } else {
    //             setErrMsg('Registration Failed')
    //         }
    //         errRef.current.focus();
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            // const response = await axios.post(REGISTER_URL,
            //     JSON.stringify({ user, pwd }),
            //     {
            //         headers: { 'Content-Type': 'application/json' },
            //         withCredentials: true
            //     }
            // );
            // TODO: remove console.logs before deployment
            // console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }


    const url = "http://api.db-ip.com/v2/free/self"
    async function getLocations(){
      try {
      return await fetch(url)
        .then((response)=> response.json())
        .then((data)=>setInfo(data))

      } catch (error) {
        console.log(error)
      }
    };

   
    console.log(info.ipAddress)

    return (
        <>

            <h1 className="hhh">Ro'yxatdan o'tish</h1>
            {success ? (
                <section >
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section >
                    
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    {/* <h1>Ro'yxatdan o'tish</h1> */}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Ism va Familiya
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        
                        <div className='register__box'>
                                    <div>
                                        <input className='login__input' id='age' type="number" name='age' placeholder='Yosh' required min={7} max={90} />
                                    </div>

                                    
                                    <div>
                                        <select className='login__input' name="who" required>
                                            <option value="all" disabled>Jinsi</option>
                                            <option value="erkak">Erkak</option>
                                            <option value="ayol">Ayol</option>
                                        </select>
                                    </div>
                        </div>


                        <label htmlFor="number">Raqam kiriting</label>
                        
                        <input className="numbeInput"
                             type="number"
                             id="number"
                             onChange={(e) => setNumber(e.target.value)}
                             value={number}
                             required
                             placeholder="+998"
                        />

                        
                        <label htmlFor="password">
                            Parol yarating
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="createInput"
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 belgi bolishi kerag<br />
                            Katta va kichick xarflar xamda raqamdan iborat bolsin Belgilar ruxsat etilgan:
                             <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        
                        <label htmlFor="confirm_pwd">
                            Parolni tasdiqlang
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input 
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Kiritgan parolingiz mos kelmayapti
                        </p>


                        <button  onClick={()=> getLocations()}>Royxatdan otish</button>
                    </form>

                </section>
                    


             )} 

                    <div className="lastItem">
                         <p>Akkaunt bormi?</p>
                         <a onClick={()=> setShow(true)} >Royxatdan oting</a>
                     </div>
        </>
    )
}

export default Register



                            {/* <div className='register__input__box'>
                                    <div className='login__input__box login__input__box--width'>
                                        <input className='login__phone__input' id='age' type="number" name='age' placeholder='' required min={7} max={90} />
                                        <label className="login__phone_label" htmlFor="age">
                                            Yosh
                                        </label>
                                    </div>
                                    <div className='login__input__box login__input__box--select'>
                                        <select className='login__phone__input login__phone__input--select' name="who" required>
                                            <option value="all" disabled>Jinsi</option>
                                            <option value="erkak">Erkak</option>
                                            <option value="ayol">Ayol</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='login__input__box'>
                                    <PhoneInput
                                        country={code}
                                        value={state?.phone}
                                        onChange={phone => setState(phone)}
                                        onFocus={TrackPhone}
                                        required={true}
                                    />
                                    <span className={err2 ? 'forget__error__span' : 'close'}>{err2 ? "Telefon raqami ro'yhatdan o'tgan" : ""}</span>
                                </div> */}




// GET location code with permission 

// const [location , setLocation ] = useState({
//     loaded: false ,
//     coordinates: {lat: '' , long: ''}
//   })

//   const onSucces = (location) => {
//     setLocation({
//       loaded : true,
//       coordinates: {
//         lat: location.coords.latitude,
//         lng : location.coords.longitude,
//       },
//     });
//   };

//   const onError = (error) => {
//       setLocation({
//         loaded: true ,
//         error,
//       })
//   }
  
//   useEffect(()=>{
//     if(!("geolocation" in navigator)) {
//       onError({
//         code : 0 ,
//         message : 'not succes'
//       })
//     }
//     navigator.geolocation.getCurrentPosition(onSucces , onError);
//   }, []);
  
//   return(
//     <div>
//       {location.loaded ? JSON.stringify(location) : "failed to load"}
//     </div>
//   )




// disabled={!validName || !validPwd || !validMatch ? true : false}