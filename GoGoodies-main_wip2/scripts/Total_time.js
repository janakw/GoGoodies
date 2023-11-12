console.log("fileLoaded: Total_time.js");

//ABSCHNITT variablen deklarieren==================================================================
import { supa } from "../config/config.js";

let user_id = "1346c248-0a47-4e87-9c47-272e1785dabe";


//ABSCHNITT funktionen aufruf==================================================================
checkUser();


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
        localStorage.setItem("user_id", user_id);

  
  
        }   else {
  
          console.log("infoUser: not authenticated");
  
          
  
          //wenn nicht eingeloggt auf login page weiterleiten
          //window.location.href = "../index.html";
              
          }
  
  
    }//ENDE FUNKTION checkUser()
// Datenbankabfrage
const { data, error } = await supa
    .from('users')
    .select('totalSwipingTime')
    .eq('user_id', user_id)

// Die abgerufene Zeit aus der Datenbank
const abgerufeneZeit = data ? data[0].totalSwipingTime : 0; // Annahme: Falls die Daten erfolgreich abgerufen wurden

// Funktion zum Aktualisieren des HTML-Texts mit der abgerufenen Zeit
function updateWischZeitHTML(abgerufeneZeit) {
    // HTML-Element, das die Zeit anzeigen soll
    const anweisungAfterSwipeElement = document.getElementById('anweisungAfterSwipe');

    // Prüfung, ob das Element existiert, bevor die Änderungen durchgeführt werden
    if (anweisungAfterSwipeElement) {
        anweisungAfterSwipeElement.textContent = `Du warst ${abgerufeneZeit} min unterwegs.`;
    }
}

// Die Funktion zur Aktualisierung des HTML-Elements mit der abgerufenen Zeit aufrufen
updateWischZeitHTML(abgerufeneZeit);
