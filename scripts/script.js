import { supa } from "../config/config.js"; //hier greifen wir auf unsere config datei zu um auf supabase zuzugreifen



document.addEventListener('DOMContentLoaded', function() {
    const text = document.getElementById('placeholder');
    const input = document.getElementById('inputField');
    const passwortText = document.getElementById('passwortPlaceholder');
    const passwortInput = document.getElementById('passwortInputField');
    const registrierenButton = document.querySelector('.registrieren-button');
  
    text.addEventListener('click', function() {
      text.style.display = 'none'; // Text ausblenden
      input.style.display = 'block'; // Texteingabefeld einblenden
      input.focus(); // Texteingabefeld aktivieren
    });
  
    input.addEventListener('blur', function() {
      if (input.value === '') {
        text.style.display = 'block'; // Text wieder einblenden, wenn nichts eingegeben wurde
        input.style.display = 'none'; // Texteingabefeld ausblenden
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
  });
  

