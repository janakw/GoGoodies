import { supa } from "../config/config.js";


async function logout() {

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
  }
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
   
});


// Function to sign up using email and password
async function registrieren() {
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
}



Kontoerstellen.addEventListener('click', function() {
    // Hier setzt du die Weiterleitungs-URL ein, zu der der Button führen soll
    registrieren();
});