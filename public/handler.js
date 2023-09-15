export let buttonValue = null;

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.getElementsByClassName("type__button");

    for (let i = 0; i < buttons.length; i++) {
        console.log('i: ', i)
        buttons[i].addEventListener("click", function() {

            for (let j = 0; j < buttons.length; j++) {
                buttons[j].style.backgroundColor = "";
                buttons[j].style.color = "";
            }

            this.style.backgroundColor = "#ff5733";
            this.style.color = "#fff";

            buttonValue = this.value;
            if (buttonValue === "DAY") {
              addDayStyles();
              console.log("DAY 버튼을 클릭하셨습니다!");
          } else if (buttonValue === "FANTASY") {
            console.log("FANTASY 버튼을 클릭하셨습니다!");
            addDayStyles();
          } else if (buttonValue === "NIGHT") {
              addNightStyles();
              console.log("NIGHT 버튼을 클릭하셨습니다!");
          }
        });
    }
});

function addDayStyles() {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
      * {
          background-color: inherit;
      }
  `;
  document.head.appendChild(style);
}

function addNightStyles() {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
      * {
          background-color: white;
          // mix-blend-mode: difference;
      }
  `;
  document.head.appendChild(style);
}