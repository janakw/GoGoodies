console.log("fileLoaded: registrieren_script.js");

//ABSCHNITT variabeln deklaration==================================================================

import { supa } from "../config/config.js";

let user_id = "1346c248-0a47-4e87-9c47-272e1785dabe";


//ABSCHNITT funktionen aufruf==================================================================

checkUser();

//EVENT DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById("abmeldenButton")) {
    document.getElementById("abmeldenButton").addEventListener("click", logout);}

    const emailText = document.getElementById('emailplaceholder');
    const emailInput = document.getElementById('emailinputField');

    const benutzernameText = document.getElementById('benutzernamePlaceholder');
    const benutzernameInput = document.getElementById('benutzernameInputField');

    const passwortText = document.getElementById('passwortPlaceholder');
    const passwortInput = document.getElementById('passwortInputField');

    const passwortwiederholenText = document.getElementById('passwortwiederholenPlaceholder');
    const passwortwiederholenInput = document.getElementById('passwortwiederholenInputField');

    const Kontoerstellen = document.querySelector('#Kontoerstellen');

    const email = document.getElementById('emailinputField').value;
    const password = document.getElementById('passwortInputField').value;
    const passwortwiederholen = document.getElementById('passwortwiederholenInputField').value;

    function togglePlaceholder(textElement, inputElement) {
        textElement.style.display = 'none';
        inputElement.style.display = 'block';
        inputElement.focus();
    }

    function restorePlaceholder(textElement, inputElement) {
        if (inputElement.value === '') {
            textElement.style.display = 'block';
            inputElement.style.display = 'none';
        }
    }

    emailText.addEventListener('click', function() {
        togglePlaceholder(emailText, emailInput);
    });

    emailInput.addEventListener('blur', function() {
        restorePlaceholder(emailText, emailInput);
    });

    passwortText.addEventListener('click', function() {
        togglePlaceholder(passwortText, passwortInput);
    });

    passwortInput.addEventListener('blur', function() {
        restorePlaceholder(passwortText, passwortInput);
    });

    passwortwiederholenText.addEventListener('click', function() {
        togglePlaceholder(passwortwiederholenText, passwortwiederholenInput);
    });

    passwortwiederholenInput.addEventListener('blur', function() {
        restorePlaceholder(passwortwiederholenText, passwortwiederholenInput);
    });
   
});//ENDE EVENT DOMContentLoaded



//ABSCHNITT funktionen defintion==================================================================

  

    // Function to sign up using email and password

    //FUNKTION registrieren2()
    async function registrieren2() {
        console.log("functionExecuted: registrieren2()");

        const password = document.getElementById('passwortInputField').value;
        const passwortwiederholen = document.getElementById('passwortwiederholenInputField').value;
        const email = document.getElementById('emailinputField').value;
        


        // Check if either of the fields is empty or if they don't match
        if (password === '' || passwortwiederholen === '' || password !== passwortwiederholen) {

            alert('Gib das gleiche Passwort zwei Mal ein');


            } else {

            
                const {data, error} = await supa.auth.signUp({
                    email: email,
                    password: password
                })

                    if (error) {

                        console.log("error: ", error);

                        alert("Registrierung fehlgeschlagen:", error);


                    } else {


                    console.log("data: ", data);

                    let user = data.user;

                    console.log("user: ", user);



                    alert("Mail Verifizierung ausstehend: " + user.email );

                    window.location.href = ("../index.html")

            
                

            }


        }

    }//ENDE FUNKTION registrieren2()

    //FUNKTION registrieren()
    async function registrieren() {
        console.log("functionExecuted: registrieren()");


        const password = document.getElementById('passwortInputField').value;
        const passwortwiederholen = document.getElementById('passwortwiederholenInputField').value;
        const email = document.getElementById('emailinputField').value;

        // Check if either of the fields is empty or if they don't match
        if (password === '' || passwortwiederholen === '' || password !== passwortwiederholen) {
        alert('Gib das gleiche Passwort zwei Mal ein');
        } else {
        const { data, error } = await supa.auth.signUp({
            email, password
        });
        
        if (error) {
            console.error("Error during sign up: ", error.message);
        } else {
            console.log("Signed up as ", email);
            window.location.href = ("/")
        }
        }
    } //ENDE FUNKTION registrieren()


    Kontoerstellen.addEventListener('click', function() {
        // Hier setzt du die Weiterleitungs-URL ein, zu der der Button führen soll
        registrieren2();
    });



    //FUNKTION logout()
    async function logout() {
        localStorage.removeItem("user_id");

        try {
        // Call the signOut method to log the user out
        const { error } = await supa.auth.signOut();
    
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            window.location.href = "/"
        }
        } catch (error) {
        console.error('Error:', error.message);
        }
    }//ENDE FUNKTION logout()


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
        localStorage.setItem("user_id", user_id);
         //wenn BEREITS eingeloggt auf swipe go page weiterleiten
        window.location.href = 'swipeGo.html'
  
  
        }   else {
  
          console.log("infoUser: not authenticated");
  
        
         
              
          }
  
  
    } //ENDE FUNKTION checkUser()