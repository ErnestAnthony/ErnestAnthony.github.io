const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const eventsArr = [
    {
        day: 5,
        month: 12,
        year: 2024,
        events:[
            {
                title: "Event 1",
                time:"10:00AM"
            },
            {
                title:"Event 2",
                time:"11:00AM"
            }
        ]
    }
]
function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
      }
    
      for (let i = 1; i <= lastDate; i++) {
        
        let event = false;
        eventsArr.forEach((eventObj) => {
          if (
            eventObj.day === i &&
            eventObj.month === month + 1 &&
            eventObj.year === year
          ) {
            event = true;
          }
        });

        if (
          i === new Date().getDate() &&
          year === new Date().getFullYear() &&
          month === new Date().getMonth()
        ) {
          if (event) {
            days += `<div class="day today  event">${i}</div>`;
          } else {
            days += `<div class="day today ">${i}</div>`;
          }
        } else {
          if (event) {
            days += `<div class="day event">${i}</div>`;
          } else {
            days += `<div class="day ">${i}</div>`;
          }
        }
      }
    
    for(let j =1; j <= nextDays; j++){
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;

    addListener();
}

initCalendar();

function prevMonth(){
    month--;
    if(month<0){
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todayBtn.addEventListener("click", () =>{
    today =new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
      dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
      dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward") {
      if (dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
      }
    }
  });

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    console.log("here");
    const dateArr = dateInput.value.split("/");
    if (dateArr.length === 2) {
      if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
        month = dateArr[0] - 1;
        year = dateArr[1];
        initCalendar();
        return;
      }
    }
    alert("Invalid Date");
  }

  addEventBtn.addEventListener("click", () =>{
    addEventWrapper.classList.toggle("active");
  });

  addEventCloseBtn.addEventListener("click", () =>{
    addEventWrapper.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
      addEventWrapper.classList.remove("active");
    }
  });

  addEventTitle.addEventListener("input", (e) =>{
    addEventTitle.value = addEventTitle.value.slice(0,50);
  });

  addEventFrom.addEventListener("input", (e) =>{
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length ===2){
        addEventFrom.value += ":";
    }
    if(addEventFrom.value.length > 5){
        addEventFrom.value = addEventFrom.value.slice(0,5);
    }
  });

  addEventTo.addEventListener("input", (e) =>{
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length ===2){
        addEventTo.value += ":";
    }
    if(addEventTo.value.length > 5){
        addEventTo.value = addEventTo.value.slice(0,5);
    }
  });

  function addListener(){
    const days = document.querySelectorAll(".day");
    days.forEach((day) =>{
        day.addEventListener("click", (e) =>{
            activeDay = Number(e.target.innerHTML)

            days.forEach((day)=>{
                day.classList.remove("active");
            });


            if(e.target.classList.contains("prev-date")){
                prevMonth();

                setTimeout(()=>{
                    const days = document.querySelectorAll(".day");
                    days.forEach((day)=>{
                        if(
                            !day.classList.contains("prev-date") &&
                            day.innerHTML === e.target.innerHTML
                        ){
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
        });
    });
  }