import './Login.css';

import { initializeApp } from "firebase/app";
import { getDatabase, ref , set, child , update, remove, onValue, get} from "firebase/database";

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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }


function Login() {
  function loginfun(){
            function dispinfo(sid){
              get(child(ref(db), "yogacenter/" + sid)).then((snapshot) => {
                  if (snapshot.exists()) {
                  var name = snapshot.child('name').val();
                  var mobile = snapshot.child('mobile').val();
                  var dob = snapshot.child('dob').val();
                  var classs = snapshot.child('class').val();
                  var pwd = snapshot.child('password').val();
                  var batchh = snapshot.child('batch').val();
                  document.getElementById("dname").innerHTML = " Name : "+name;
                  document.getElementById("dmobile").innerHTML = " Mobile : "+mobile;
                  document.getElementById("ddob").innerHTML = " DOB : "+dob;
                  sessionStorage.setItem("class",classs);
                  sessionStorage.setItem("pwd",pwd);
                  if(classs==="active"){
                    document.getElementById("paid").style.visibility = "visible";
                    document.getElementById("timeslot").innerHTML = batchh;
                  }
                  }
              });
            } 

          var sid = document.getElementById("unumber").value;
          var spass = document.getElementById("upass").value;
          if(sid ==="" || spass === "")
              {
                  alert("Please fill all details!");
              }
              
          get(child(ref(db), "yogacenter/" + sid)).then(async (snapshot) => {

              if (snapshot.exists()) {
                  var pass = snapshot.child('password').val();
                  var CryptoJS = require("crypto-js");
                  pass = CryptoJS.AES.decrypt(pass, "anits").toString(CryptoJS.enc.Utf8);
                  if (pass === spass) {
                      document.getElementById("homeblock").style.visibility="visible";
                      document.getElementById("unumber").value="";
                      document.getElementById("upass").value="";
                      document.getElementById("name").value="";
                      document.getElementById("mobile").value="";
                      document.getElementById("password").value="";
                      document.getElementById("repassword").value="";
                      document.getElementById("dob").value="";
                      dispinfo(sid);
                  }
                  else {
                      alert("Wrong password");
                  }
              }
              else{
                  alert("Invalid user");
              }
          });

    
  }



  async function slidetoregister(){
    document.getElementById("loginform").style.animation = "closelogin 800ms 1";
    document.getElementById("registerform").style.animation = "openregister 800ms 1";
    document.getElementById("registerform").style.zIndex = 2;
    document.getElementById("loginform").style.zIndex = 1;
    document.getElementById("registerform").style.transform = "scale(1)";
    document.getElementById("loginform").style.marginTop = "100px";
    document.getElementById("registerform").style.marginTop = "100px";
  }
  return (
    <div id="loginblock">
      <div id="loginform">
        <h1>Yoga Class Login</h1><br/><br/>
        <input type="text" id="unumber" placeholder='Enter your mobile number' /> <br/><br/>
        <input type="password" id="upass" placeholder='Enter your password' /> <br/><br/>
        <button onClick={loginfun}>Login</button> <br/><br/>
        <b onClick={slidetoregister}>Register</b>
      </div>
    </div>
  );
}

export default Login;
