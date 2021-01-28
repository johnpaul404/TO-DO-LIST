// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const focus = document.getElementById('focus');
const time = document.getElementById('time');



// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from locastorage
let data = localStorage.getItem("TODO");

// check if data is not empty 
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty 
    LIST = [];
    id = 0;
}

// load the items to the user's interface
function loadList(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
}); 
  
// Show todays date
const options = {weekday :"long", month:"short", day:"numeric"};
const today = new Date();  
 

dateElement.innerHTML = today.toLocaleDateString("en-US", options); 


// add to do function
function addToDo(toDo, id, done, trash){


    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}<p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
            `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

    
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even) {
    if(event.keyCode == 13) {
        const toDo = input.value;

        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false

            });



            // add item from localstorage ( this code must be added where the LIST array is updated )
localStorage.setItem("TODO", JSON.stringify(LIST));

             id++;

        }
        input.value = "";
    }
});

// complete to do 
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;

}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamicaly

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    // add item from locastorage ( this code must be added where the LIST array is updated )
localStorage.setItem("TODO", JSON.stringify(LIST));

});


//  Get Focus
function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = '[Type Here]';
    } else{
        focus.textContent = localStorage.getItem('focus');
    }
}

// SetFocus
function setFocus(e) {
    if(e.type === 'keypress') { 
        // Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
        }


    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

// Options
const showAmPm = true;

// Show Time
function showTime() {
    // let today = new Date(2019, 06, 10, 20, 33, 30),
    // let today = new Date(2019, 06, 10, 10, 33, 30),
    let today = new Date(),
        hour = today.getHours(),
        min  = today.getMinutes(),
        sec = today.getSeconds();


        // Set AM or PM 
        const amPM = hour >= 12 ? 'PM' : 'AM';

        // 12hr Format
        hour = hour % 12 || 12;

        // Output Time
        time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPM :  ''}`;
        setTimeout(showTime, 1000);

}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '')+ n;
}


focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

showTime();
getFocus();
setFocus();