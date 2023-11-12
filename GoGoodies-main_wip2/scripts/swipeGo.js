console.log("fileLoaded: swipeGo.js");

//ABSCHNITT variabeln=============================================================================

import { supa  } from "../config/config.js";

let user_id = "1346c248-0a47-4e87-9c47-272e1785dabe";


//html-elemente anhand id als variable verknüpfen, damit diese variablen in js aufgerufen/angesteuert werden können
let überschriftSwipe = document.querySelector("#überschriftSwipe");
let infoZeit = document.querySelector("#infoZeit");


let buttonSwipe = document.querySelector("#buttonSwipe");
let toggleSwipe = false;  /* button links ist false */
let anweisungSwipe = document.querySelector("#anweisungSwipe");

let fahrZeit = 0;



let currentStartedSwipingTime = 0;
let currentFinishedSwipingTime = 0;

let currentMinutes;
let currentStars;

let totalSwipingTime;


//ABSCHNITT funktionen aufruf==================================================================

checkUser();

eventButtonSwipe();




//ABSCHNITT funktionen defintion==================================================================


      //FUNKTION eventButtonSwipe()
      function eventButtonSwipe() {
        

          buttonSwipe.addEventListener("click", function() {


              console.log("button_clicked: swipeButton") 

              // nach click wird nächste funktion aufgerufen:

              toggleSwipeButton();








              
              })

      }//ENDE FUNKTION eventButtonSwipe()


      //FUNKTION toggleSwipeButton()
      async function toggleSwipeButton() {



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

              calculateCurrentMinutes();

              const intervalId = setInterval(calculateCurrentMinutes, 60000);

        


          } else { 

              calculateCurrentMinutes();

              await calculateTotaleMinutes();



      //auf totalTime page weiterleiten
              updateFinishedSwipingTime();

              

              window.location.href = "Total_time.html";




            /*   if(buttonSwipe.classList.contains("swipeGo")){
              buttonSwipe.classList.remove("swipeGo");  
              }
              buttonSwipe.classList.add("swipeStop");    
              toggleSwipe=false; */
          }
      } //ENDE FUNKTION toggleSwipeButton()


      //FUNKTION updateStartedSwipingTime()
        async function updateStartedSwipingTime() {

          currentStartedSwipingTime = new Date().toISOString(); 

          // Get the current timestamp
          const currentTimestamp = currentStartedSwipingTime;

        // Perform the update operation

      
        const { data, error } = await supa
        .from('users')
        .update({ startedSwipingTime: currentTimestamp })

        .eq('user_id', user_id)
        .select()

      
        if (error) {
          console.error('Error updating finishedSwipingTime:', error);
        } else {
          console.log('stardedSwipingTime updated successfully.');
        }

        
      }//ENDE FUNKTION updateStartedSwipingTime()


      //FUNKTION calculateTimePeriodInMinutes()
      function calculateTimePeriodInMinutes(timestamp1, timestamp2) {
        
        const date1 = new Date(timestamp1);
        const date2 = new Date(timestamp2);
      
        // Calculate the time difference in milliseconds
        const timeDifferenceMillis = Math.abs(date2 - date1);

        //console.log(timeDifferenceMillis);
      
        // Convert milliseconds to minutes
        const minutes = Math.floor(timeDifferenceMillis / (1000 * 60));

        console.log(minutes);
      
        return minutes;
      }//ENDE FUNKTION calculateTimePeriodInMinutes()


      //FUNKTION calculateCurrentMinutes()
      function calculateCurrentMinutes(){

        console.log("functionExecuted: calculateCurrentMinutes");

        currentFinishedSwipingTime = new Date().toISOString(); //gibt es ein besseres zeitformat um eine zeitdauer auszurechnen??

        console.log("currentStartedSwipingTime: ", currentStartedSwipingTime);
        console.log("currentFinishedSwipingTime: ", currentFinishedSwipingTime);


        currentMinutes = calculateTimePeriodInMinutes(currentStartedSwipingTime, currentFinishedSwipingTime);

        console.log(currentMinutes);

        displayCurrentMinutes();

        

      }//ENDE FUNKTION calculateCurrentMinutes()

      //FUNKTION displayCurrentMinutes()
      function displayCurrentMinutes(){

        console.log("functionExecuted: displayCurrentMinutes")

        fahrZeit = currentMinutes;

        infoZeit.innerHTML= "Du bist seit " + fahrZeit + "min unterwegs";




      }//ENDE FUNKTION displayCurrentMinutes()

      //FUNKTION calculateTotaleMinutes()
      async function calculateTotaleMinutes(){

        const { data, error } = await supa
      .from('users')
      .select('totalSwipingTime')
      .eq('user_id', user_id)

      console.log(data);

      let currentSwipingTime = data[0].totalSwipingTime;

      console.log(currentSwipingTime);

      totalSwipingTime = currentSwipingTime + currentMinutes;

      console.log("totalSwipingTime: ", totalSwipingTime)


      calculateCurrentStars();




      }// ENDE FUNKTION calculateTotaleMinutes()

      //FUNKTION calculateCurrentStars()
      function calculateCurrentStars(){

        currentStars = totalSwipingTime * 2;




      }// ENDE FUNKTION calculateCurrentStars()

      //FUNKTION updateFinishedSwipingTime()
        async function updateFinishedSwipingTime() {

          // Get the current timestamp
          const currentTimestamp = currentFinishedSwipingTime;

          console.log("totalSwipingTime: ", totalSwipingTime)
    

        // Perform the update operation

       
        const { data, error } = await supa
        .from('users')
        .update({ finishedSwipingTime: currentTimestamp, totalSwipingTime: totalSwipingTime, starsCount: currentStars})

        .eq('user_id', user_id)
        .select()

        console.log(data);

      
        if (error) {
          console.error('Error updating finishedSwipingTime:', error);
        } else {
          console.log('finishedSwipingTime updated successfully.');
        }

        
      }//ENDE FUNKTION updateFinishedSwipingTime()

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

            

            //wenn NICHT eingeloggt auf login page weiterleiten
            //window.location.href = "../index.html";
                
            }


      }

      //FUNKTION getTimeStamps()
         async function getTimeStamps(){

            console.log("functionExecuted: getTimeStamps")
    
            const { data, error } = await supa
            .from('users')
            .select('startedSwipingTime, finishedSwipingTime')
            .eq('user_id', user_id)
    
            console.log(data);
    
            let startedSwipingTime = data[0].startedSwipingTime;
            let finishedSwipingTime = data[0].finishedSwipingTime;
    
            console.log(startedSwipingTime);
            console.log(finishedSwipingTime);
    
            let totalMinutes = calculateTimePeriodInMinutes(startedSwipingTime, finishedSwipingTime);
    
            console.log(totalMinutes);
    
          
    
    
    
    
      } //ENDE FUNKTION getTimeStamps()
    