import { supa } from "../config/config.js"; //hier greifen wir auf unsere config datei zu um auf supabase zuzugreifen



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
        window.location.href = 'registrieren.html';
      });


// Function to login using email and password
async function login() {
  console.log("Login ausgeführt");
  const email = emailInput.value;
  const password = passwortInput.value;

  const { error } = await supa.auth.signIn({ email, password });

  if (error) {
      console.error("Error during login: ", error.message);
  } else {
      console.log("Logged in as ", email);
      window.location.href = 'http://localhost:5500/index.html'

  }

}anmeldenButton.addEventListener('click', function() {
  // Hier setzt du die Weiterleitungs-URL ein, zu der der Button führen soll
  login();
});






  });
  

