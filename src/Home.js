import './Home.css';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set,onValue ,update} from "firebase/database";


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

var date = new Date();
var time = new Date(date.getTime());
time.setMonth(date.getMonth() + 1);
time.setDate(0);
var days = time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;



function Home() {
    function logoutfun(){
        document.getElementById("homeblock").style.visibility="hidden";
        document.getElementById("paid").style.visibility="hidden";
        document.getElementById("timeslot").innerHTML = "";

    }

    function closepayment(){
        document.getElementById("paytemp").style.visibility="hidden";
        document.getElementById("paymentform").style.visibility="hidden";
        document.querySelector('input[name="slot"]:checked').checked = false;
    }

    function completepayment(){
            var slot = document.querySelector('input[name="slot"]:checked').value;

            var tempmobile = document.getElementById("dmobile").innerHTML;
            tempmobile = tempmobile.slice(9);
            var tempname = document.getElementById("dname").innerHTML;
            tempname = tempname.slice(7);
            var tempdob = document.getElementById("ddob").innerHTML;
            tempdob = tempdob.slice(6);

            const tref = ref(db, 'yogacenter/' + parseInt(tempmobile) );

            var passs = sessionStorage.getItem("pwd");

            set(tref,{ class: "active" , batch: slot , password: passs , name : tempname , dob : tempdob, mobile : tempmobile });
    
            
            

        document.getElementById("paytemp").style.visibility="hidden";
        document.getElementById("paymentform").style.visibility="hidden";
        document.querySelector('input[name="slot"]:checked').checked = false;
        document.getElementById("paid").style.visibility="visible";
        alert("Payment successfull");
    }

    function openpayment(){
        document.getElementById("paytemp").style.visibility="visible";
        document.getElementById("paymentform").style.visibility="visible";
    }

  return (
    <div id="homeblock">
      <div id="header">
        <b>Profile</b>
        <button id="logout" onClick={logoutfun} >Logout</button> <br/> <br/>
        <div id="detailsblock">
          <div id="profilepic"></div>
          <div id="details">
            <p id="dname"> Name :  </p>
            <p id="dmobile"> Mobile :  </p>
            <p id="ddob"> DOB :  </p> 
          </div>
        </div>
      </div>

      <div id="bottomcontainer">
        <div id="plan">
            <b>Active Plan</b> <br/>
            <div id="notpaid">
              <h5>You are not currently enrolled for any classes</h5>
              <button id = "openpaybutton" onClick={openpayment}>Enroll</button>
            </div>
            <div id="paid">
              <h2 id="timeslot"></h2>
              <h6>Expires in {days} days</h6>
            </div>
        </div>


        <div id="history">
            <b>Past Transactions</b>
        </div>
      </div>


      <div id="paytemp">
        <div id="paymentform">
            <h3>Payment Form</h3><br/><br/>
            <b>Select Batch :</b> <br/><br/>
            <input type="radio" name="slot" id="slot1" value={"6:00 - 7:00 AM"} />
            <label for="slot1"> 6:00 - 7:00 AM </label> 

            <input type="radio" name="slot" id="slot2"  value={"7:00 - 8:00 AM"}   /> 
            <label for="slot2"> 7:00 - 8:00 AM </label>  <br/> <br/>

            <input type="radio" name="slot" id="slot3"  value={"8:00 - 9:00 AM"}  />
            <label for="slot3"> 8:00 - 9:00 AM </label>

            <input type="radio" name="slot" id="slot4"  value={"5:00 - 6:00 PM"}  />
            <label for="slot4"> 5:00 - 6:00 PM </label>   <br/> <br/>

            <b>Fee Amount : 500rs</b> <br/><br/>

            <button onClick={completepayment} id="paycompletebt">Pay</button>
            <button onClick={closepayment} id="payclosebt">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
