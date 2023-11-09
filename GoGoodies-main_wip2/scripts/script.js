console.log("fileLoaded: script.js")

//ABSCHNITT variablen deklarieren==================================================================

//IMPORTIEREN supabase client
import { supa } from "../config/config.js"; //hier greifen wir auf unsere config datei zu um auf supabase zuzugreifen



//ABSPEICHERN globale variablen

let user_id = "1346c248-0a47-4e87-9c47-272e1785dabe";


//ABSCHNITT funktionen aufruf==================================================================
checkUser();



document.addEventListener('DOMContentLoaded', function() {
    const text = document.getElementById('placeholder');
    const emailInput = document.getElementById('emailInputField');
    const passwortText = document.getElementById('passwortPlaceholder');
    const passwortInput = document.getElementById('passwortInputField');
    const registrierenButton = document.querySelector('#registrieren-button');
    const anmeldenButton = document.querySelector('#anmelden-button');

  
    text.addEventListener('click', function() {
      text.style.display = 'none'; // Text ausblenden
      emailInput.style.display = 'block'; // Texteingabefeld einblenden
      emailInput.focus(); // Texteingabefeld aktivieren
    });
  
    emailInput.addEventListener('blur', function() {
      if (emailInput.value === '') {
        text.style.display = 'block'; // Text wieder einblenden, wenn nichts eingegeben wurde
        emailInput.style.display = 'none'; // Texteingabefeld ausblenden
      }
    });
  
    passwortText.addEventListener('click', function() {
      passwortText.style.display = 'none'; // Text ausblenden
      passwortInput.style.display = 'block'; // Texteingabefeld einblenden
      passwortInput.focus(); // Texteingabefeld aktivieren
    });
  
    passwortInput.addEventListener('blur', function() {
      if (passwortInput.value === '') {
        passwortText.style.display = 'block'; // Text wieder einblenden, wenn nichts eingegeben wurde
        passwortInput.style.display = 'none'; // Texteingabefeld ausblenden
      }
      
    });
    registrierenButton.addEventListener('click', function() {
        // Hier setzt du die Weiterleitungs-URL ein, zu der der Button führen soll
        window.location.href = 'pages/registrieren.html';
      });



//ABSCHNITT funktionen defintion==================================================================================================
    // Function to login using email and password
    //FUNKTION login2()
    async function login2() {
      console.log("functionExecuted: login2()");

      const email = emailInput.value;
      const password = passwortInput.value;

      console.log("mailUser: ", email);
      console.log("passUser: ", password);
      
      const { data, error } = await supa.auth.signInWithPassword({
          email: email,
          password: password
      
      })

      if (data.user != null) {

      console.log("data: ", data);

      window.location.href = 'pages/swipeGo.html'

      }
    
      if (error) {
          console.log("error: ", error);
      

          infoAuth.innerHTML = "Mail oder Passwort ungültig";
      



      }





    }//ENDE FUNKTION loginUser()

    //FUNCTION login()
    async function login() {

      const email = emailInput.value;
      const password = passwortInput.value;

      const { error } = await supa.auth.signIn({ email, password });

      if (error) {
          console.error("Error during login: ", error.message);
      } else {

          window.location.href = '/pages/swipeGo.html'
      }

    } //ENDE FUNKTION login()



    anmeldenButton.addEventListener('click', function() {
      // Hier setzt du die Weiterleitungs-URL ein, zu der der Button führen soll
      login2();
    });

      });




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

      //wenn BEREITS eingeloggt auf swipe go page weiterleiten
      window.location.href = 'pages/swipeGo.html'


      }   else {

        console.log("infoUser: not authenticated");

        

       
            
        }


    } //ENDE FUNKTION checkUser()
  

