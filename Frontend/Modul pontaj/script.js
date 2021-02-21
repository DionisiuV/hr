





const select = document.querySelector("#suggestions");
const inputS = document.querySelector("#suggestions-id");
const url = "pontaje.json";
let dataArray = [];


axios
.get(url)
.then(function (response) {
  const options = response.data;
  dataArray = options;
  console.log()

  for (let i = 0; i < options.length; i++) {
    const opt = options[i].employee;
    const el = document.createElement("option");
    el.textContent = opt;
    el.od = options[i].id;
    select.appendChild(el);
  }
})
.catch(function (error) {
  console.log(error);
});

function selectareAngajat() {
    return dataArray.map(function (index) {return index.employee;}).indexOf(inputS.value);
    
  }

function start() {
    select.addEventListener("change", selectareAngajat, false);
    select.onchange = function (event) {
  
    };
  }


window.addEventListener("load", start, false);