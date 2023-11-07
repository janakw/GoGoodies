console.log ("file_executed: swipeGo.js");

//ABSCHNITT variabeln=============================================================================

import { supa  } from "../config/config.js";

console.log(supa);

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
  
console.log("function_executed: eventButtonSwipe");




    buttonSwipe.addEventListener("click", function() {


        console.log("button_clicked: swipeButton") 

        // nach click wird nächste funktion aufgerufen:

        toggleSwipeButton();








        
        })

}



function toggleSwipeButton() {

    console.log("function_executed: toggleSwipeButton");

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
        
        window.location.href = "../Moritz/Pages/Total_time.html";




        //window.location.href = "Total_time.html"; 


      /*   if(buttonSwipe.classList.contains("swipeGo")){

        buttonSwipe.classList.remove("swipeGo");  

        }
        
        buttonSwipe.classList.add("swipeStop");    
        
        toggleSwipe=false; */

    }




    
    
    
}



/* wenn variable false ist muss classe swipe go hinzugefügt werden wenn true class swipestopp hinzufügen */





let user_id = '2df3e78b-5b79-4dc3-a4ea-176167e8cbdb'


    async function updateStartedSwipingTime() {
       
        // Get the current timestamp
        const currentTimestamp = new Date().toISOString(); //gibt es ein besseres zeitformat um eine zeitdauer auszurechnen??
      
      
        // Perform the update operation
       
        const { data, error } = await supa
        .from('users_duplicate')
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
        .from('users_duplicate')
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

        //console.log("data: ", data);

        if (data.session) {

        let user = data.session.user;
        
        currentUser = user;

        console.log("infoUser: authenticated as ", data.session.user);

        //updateUserStatus(user);

        } else {

            console.log("infoUser: not authenticated");

            //redirect to login page

            //updateUserStatus(null);
                
            }
    
    
        
        

    

        

    }//ENDE FUNKTION checkUser()

     
      
    //FUNKTION registerUser()
    async function registerUser() {
            console.log("functionExecuted: registerUser()");

            //checkExistingUser();



            let mailUser = "aerabaern@hotmail.com";
            let passUser = "123456"
            
            //console.log("mailUser: ", mailUser);
            //console.log("passUser: ", passUser);
            
            const {data, error} = await supa.auth.signUp({
                email: mailUser,
                password: passUser
            })

            if (error) {

                console.log("error: ", error);

                //infoUser.textContent = "Registrierung fehlgeschlagen";
            }


            console.log("data: ", data);

    }
