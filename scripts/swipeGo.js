
//ABSCHNITT variabeln=============================================================================

import { supa  } from "../config/config.js";




//html-elemente anhand id als variable verknüpfen, damit diese variablen in js aufgerufen/angesteuert werden können
let überschriftSwipe = document.querySelector("#überschriftSwipe");
let infoZeit = document.querySelector("#infoZeit");


let buttonSwipe = document.querySelector("#buttonSwipe");
let toggleSwipe = false;  /* button links ist false */
let anweisungSwipe = document.querySelector("#anweisungSwipe");

let fahrZeit = 13;




/* 
addEventListener
toggleSwipe variable erstellen
 */

//ABSCHNITT funktionen aufruf==================================================================
 
eventButtonSwipe();

checkUser();

//registerUser();




//ABSCHNITT funktionen defintion==================================================================


function eventButtonSwipe() {
  



    buttonSwipe.addEventListener("click", function() {


        console.log("button_clicked: swipeButton") 

        // nach click wird nächste funktion aufgerufen:

        toggleSwipeButton();








        
        })

}



function toggleSwipeButton() {



    if (toggleSwipe==false) {
            
        if(buttonSwipe.classList.contains("swipeStop")){

            buttonSwipe.classList.remove("swipeStop");  

            }


        // Add a CSS class to the element: wir fügen swipeGo class hinzu damit animation ausgeführt wird
        buttonSwipe.classList.add("swipeGo");


        //veränderungen nach swipeGo:
        buttonSwipe.style.background= "rgba(236, 77, 77, 1)";
        überschriftSwipe.innerHTML= "Cool bist du mit dem Zug unterwegs";
        infoZeit.innerHTML= "Du bist seit " + fahrZeit + "min unterwegs";
        anweisungSwipe= "Stoppe deine Fahrt";
        //wir stellen auf true um damit wir wissen dass swipeGo schon ausgeführt wurde
        toggleSwipe=true;
        updateStartedSwipingTime();
    } else { 
//auf totalTime page weiterleiten
        updateFinishedSwipingTime();
        window.location.href = "/pages/Total_time.html";
      /*   if(buttonSwipe.classList.contains("swipeGo")){
        buttonSwipe.classList.remove("swipeGo");  
        }
        buttonSwipe.classList.add("swipeStop");    
        toggleSwipe=false; */
    }
}



/* wenn variable false ist muss classe swipe go hinzugefügt werden wenn true class swipestopp hinzufügen */





let user_id = checkUser();

    async function updateStartedSwipingTime() {
       
        // Get the current timestamp
        const currentTimestamp = new Date().toISOString(); //gibt es ein besseres zeitformat um eine zeitdauer auszurechnen??
      
      
        // Perform the update operation
       
        const { data, error } = await supa
        .from('users')
        .update({ startedSwipingTime: currentTimestamp })

        .eq('user_id', user_id)
        .select()

      
        if (error) {
          console.error('Error updating startedSwipingTime:', error);
        } else {
          console.log('startedSwipingTime updated successfully.');
        }
      }
      

        async function updateFinishedSwipingTime() {
       
        // Get the current timestamp
        const currentTimestamp = new Date().toISOString(); //gibt es ein besseres zeitformat um eine zeitdauer auszurechnen??
      
      
        // Perform the update operation
       
        const { data, error } = await supa
        .from('users')
        .update({ finishedSwipingTime: currentTimestamp })

        .eq('user_id', user_id)
        .select()

      
        if (error) {
          console.error('Error updating finishedSwipingTime:', error);
        } else {
          console.log('finishedSwipingTime updated successfully.');
        }
      }



//überprüfen ob der user eingeloggt ist:
    //FUNKTION checkUser()
    async function checkUser() {
        console.log("functionExecuted: checkUser()");

        
    /*  const { data: { user } } = await supa.auth.getUser()

        console.log("user: ", user);
        
    */

        
        const { data, error } = await supa.auth.getSession()

       console.log(data)
    }


   