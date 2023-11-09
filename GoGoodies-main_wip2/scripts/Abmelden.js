
console.log("fileLoaded: Abmelden.js");

//ABSCHNITT variablen deklarieren==================================================================

import { supa } from "../config/config.js";

let user_id = "1346c248-0a47-4e87-9c47-272e1785dabe";


//ABSCHNITT funktionen aufruf==================================================================

checkUser();

//EVENT DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {

    if (document.getElementById("abmeldenButton")) {
        document.getElementById("abmeldenButton").addEventListener("click", logout);}

    });//ENDE EVENT DOMContentLoaded


//ABSCHNITT funktionen defintion==================================================================
    //überprüfen ob der user eingeloggt ist:
    //FUNKTION checkUser()
    async function checkUser() {
        console.log("functionExecuted: checkUser()");
        
        const { data, error } = await supa.auth.getSession()
  
        //console.log("data: ", data);
    
        if (data.session) {
    
        let user = data.session.user;
    
        console.log("infoUser: authenticated as ", data.session.user);
  
        user_id = user.id;
        
        console.log("user_id: ", user_id);
  
  
        }   else {
  
          console.log("infoUser: not authenticated");
  
          
  
          //wenn nicht eingeloggt auf login page weiterleiten
          window.location.href = "../index.html";
              
          }
  
  
    } //ENDE FUNKTION checkUser()


    //FUNKTION logout()
    async function logout() {

        try {
          // Call the signOut method to log the user out
          const { error } = await supa.auth.signOut();
      
          if (error) {
            console.error('Error logging out:', error.message);
          } else {
            window.location.href = "../index.html"
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }//ENDE FUNKTION logout()

