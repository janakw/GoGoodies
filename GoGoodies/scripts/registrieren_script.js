import { supa } from "../config/config.js";

async function logout() {
  try {
    // Call the signOut method to log the user out
    const { error } = await supa.auth.signOut();

    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

document.addEventListener('DOMContentLoaded', function () {

  if (document.getElementById("abmeldenButton")) {
    document.getElementById("abmeldenButton").addEventListener("click", logout);
  }

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

  emailText.addEventListener('click', function () {
    togglePlaceholder(emailText, emailInput);
  });

  emailInput.addEventListener('blur', function () {
    restorePlaceholder(emailText, emailInput);
  });

  passwortText.addEventListener('click', function () {
    togglePlaceholder(passwortText, passwortInput);
  });

  passwortInput.addEventListener('blur', function () {
    restorePlaceholder(passwortText, passwortInput);
  });

  passwortwiederholenText.addEventListener('click', function () {
    togglePlaceholder(passwortwiederholenText, passwortwiederholenInput);
  });

  passwortwiederholenInput.addEventListener('blur', function () {
    restorePlaceholder(passwortwiederholenText, passwortwiederholenInput);
  });

  function displayErrorPopup(message) {
    alert(message); // Du kannst dies durch eine benutzerdefinierte Popup-Implementierung ersetzen
  }

  function checkPasswordLength() {
    const password = passwortInput.value;
    if (password.length < 6) {
      displayErrorPopup('Das Passwort muss mindestens 6 Zeichen lang sein');
    }
  }

  function validatePasswordMatch() {
    const password = passwortInput.value;
    const confirmPassword = passwortwiederholenInput.value;

    if (password !== confirmPassword) {
      displayErrorPopup('Gib das gleiche Passwort zwei Mal ein');
    }
  }

  Kontoerstellen.addEventListener('click', async function () {
    checkPasswordLength();
    validatePasswordMatch();
    const { data, error } = await registrieren(); // Hier rufst du die registrieren() Funktion auf

    if (error) {
      console.error("Error during sign up: ", error.message);
    } else {
      console.log("Signed up as ", email);
      // Öffne ein Popup mit Bestätigungsnachricht und Link
      window.alert(`Eine Bestätigungsnachricht wurde an deine Mailadresse gesendet. Bitte überprüfe deine E-Mails, um die Registrierung abzuschließen.`);
      window.location.href = "/index.html";
    }
  });
});

// Function to sign up using email and password
async function registrieren() {
  const password = document.getElementById('passwortInputField').value;
  const passwortwiederholen = document.getElementById('passwortwiederholenInputField').value;
  const email = document.getElementById('emailinputField').value;

  // Check if either of the fields is empty or if they don't match
  if (password === '' || passwortwiederholen === '' || password !== passwortwiederholen) {
    displayErrorPopup('Gib das gleiche Passwort zwei Mal ein');
    return { error: 'Password validation error' };
  } else {
    const { data, error } = await supa.auth.signUp({
      email, password
    });

    if (error) {
      console.error("Error during sign up: ", error.message);
      return { error };
    } else {
      console.log("Signed up as ", email);
      return { data };
    }
  }
}

