document.addEventListener('DOMContentLoaded', function() {
    const emailText = document.getElementById('emailplaceholder');
    const emailInput = document.getElementById('emailinputField');
    const benutzernameText = document.getElementById('benutzernamePlaceholder');
    const benutzernameInput = document.getElementById('benutzernameInputField');
    const passwortText = document.getElementById('passwortPlaceholder');
    const passwortInput = document.getElementById('passwortInputField');
    const passwortwiederholenText = document.getElementById('passwortwiederholenPlaceholder');
    const passwortwiederholenInput = document.getElementById('passwortwiederholenInputField');
    const Kontoerstellen = document.querySelector('.Konto-erstellen');

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

    benutzernameText.addEventListener('click', function() {
        togglePlaceholder(benutzernameText, benutzernameInput);
    });

    benutzernameInput.addEventListener('blur', function() {
        restorePlaceholder(benutzernameText, benutzernameInput);
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
    Kontoerstellen.addEventListener('click', function() {
        // Hier setzt du die Weiterleitungs-URL ein, zu der der Button führen soll
        window.location.href = 'Login Page.html';
      });
});
