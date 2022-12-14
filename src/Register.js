
import './Register.css';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set,onValue } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyB3znBXWkZDwV58pMVsjSfNblhZy07QWTc",
  authDomain: "yogacenter-9b3c1.firebaseapp.com",
  databaseURL: "https://yogacenter-9b3c1-default-rtdb.firebaseio.com",
  projectId: "yogacenter-9b3c1",
  storageBucket: "yogacenter-9b3c1.appspot.com",
  messagingSenderId: "462495983178",
  appId: "1:462495983178:web:2194eb1a8f0b57bebf28b3",
  measurementId: "G-BB4BRYV3DK"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();

const current = new Date();



function Register() {

  function slidetologin(){
    document.getElementById("registerform").style.animation = "closeregister 800ms 1";
    document.getElementById("loginform").style.animation = "openlogin 800ms 1";
    document.getElementById("registerform").style.zIndex = 1;
    document.getElementById("loginform").style.zIndex = 2;
    document.getElementById("loginform").style.transform = "scale(1)";
    document.getElementById("loginform").style.marginTop = "100px";
    document.getElementById("registerform").style.marginTop = "100px";
  }
  
  function registerfun(){
            var rname = document.getElementById("name").value;
            var rnumber = document.getElementById("mobile").value;
            var rage = document.getElementById("dob").value;
            var rpass = document.getElementById("password").value;
            var rcpass = document.getElementById("repassword").value;
            var passtemp = rpass;
            var CryptoJS = require("crypto-js");
            rpass = CryptoJS.AES.encrypt(rpass, "anits").toString();;

            if(rname ==="" || rnumber ==="" || rage === "" || passtemp === "" )
            {
                alert("Please fill all details!");
                return;
            }

            if(rnumber.length !== 10)
            {
              alert("Invalid number!");
              return;
            }

            if(passtemp!==rcpass)
            {
              alert("Passwords mismatch!");
              return;
            }

            var dob = new Date(rage);  
            var month_diff = Date.now() - dob.getTime();  
            var age_dt = new Date(month_diff);   
            var year = age_dt.getUTCFullYear(); 
            var age = Math.abs(year - 1970);  

            if(age<18 || age>65){
              alert("You are not eligible for our classes as you didn't meet the age requirements");
              return;
            }
            
            var dbref = ref(db, "/yogacenter/" + rnumber);

            
            onValue(dbref, async (snapshot) => {
    
                if (snapshot.exists()) {
                  alert("User already registered! Please login");
                }
                else {
                    set(dbref, {
                        name: rname,
                        dob: rage,
                        mobile: rnumber,
                        password: rpass,
                        class:"inactive",
                        batch:"",
                    })
                        .then(async () => {
                            alert("registration successfull");
                            slidetologin();

                        })
                        .catch(async () => {
                            alert("Registration failed!");
                            
                        });
                }
    
            }
                , {
                    onlyOnce: true
                }
            );
            

  }


  

  return (
    <div id="registerblock">
      <div id="registerform">
        <h1>Yoga Class Registration</h1><br/><br/>
        <input type="text" id="name" placeholder='Enter your name' /> <br/><br/>
        <input type="date" id="dob"  placeholder='Enter your DOB' /> <br/><br/>
        <input type="text" id="mobile" placeholder='Enter your mobile number' /> <br/><br/>
        <input type="password" id="password" placeholder='Enter your password' /> <br/><br/>
        <input type="password" id="repassword" placeholder='Confirm your password' /> <br/><br/>
        <button onClick={registerfun}>Register</button> <br/><br/>
        <b onClick={slidetologin}>Login</b>
      </div>
    </div>
  );
}

export default Register;
