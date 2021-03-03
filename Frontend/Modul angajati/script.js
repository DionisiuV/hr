

/* Start HTTP */
const url = "http://localhost:8080/api/employee/";

testAxios();

function testAxios() {
axios
  .get(url)
  .then(function (response) {
    const options = response.data.data;

    for (let i = 0; i < options.length; i++) {
      let newItem =  [createRowDataTable(options[i].firstName, options[i].surname, options[i].position, options[i].team, options[i].email, `0${options[i].phone}`, options[i].salary, options[i].paysTax)];
      gridOptions.api.applyTransaction({
        add: newItem,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

  function axiosAddEntry() {
    axios
  .post(url, {
    "firstName": `${nume.value}`,
    "surname": `${prenume.value}`,
    "team": `${echipa.value}`,
    "position": `${functie.value}`,
    "companyAge": `${vechime.value}`,
    "phone": `${telefon.value}`,
    "email": `${email.value}`,
    "salary": `${salariu.value}`,
    "paysTax": `${impozit.checked}`
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}
/* End HTTP */

const button = document.querySelector("#adauga");
const table = document.querySelector("#myTable");
const nume = document.querySelector("#inputFirstName");
const prenume = document.querySelector("#inputLastName");
const echipa = document.querySelector("#inputEchipa");
const functie = document.querySelector("#inputFunctie");
const vechime = document.querySelector("#inputVechime");
const telefon = document.querySelector("#inputTelefon");
const email = document.querySelector("#inputEmail");
const salariu = document.querySelector("#inputSalariu");
let impozit = document.querySelector("#impozitCheck");


button.addEventListener("click", function() {

  if(nume.value === `` || prenume.value === `` || echipa.value === `` || functie.value === `` || vechime.value === `` || telefon.value === `` || email.value === `` || salariu.value === ``) {
    alert(`Toate campurile sunt obligatorii!`);
    return;
  }

  axiosAddEntry();
  nume.value = ``;
  prenume.value = ``;
  echipa.value = ``;
  functie.value = ``;
  vechime.value = ``;
  telefon.value = ``;
  email.value = ``;
  salariu.value = ``;
  impozit = false;
  testAxios();
});

var columnDefs = [
    { field: "nume" },
    { field: "prenume" },
    { field: "functie" },
    { field: "echipa" },
    { field: "email" },
    { field: "telefon" },
    { field: "salariu" },
    { field: "scutit impozit" }
  ];

  // specify the data
  var rowData = [
    
  ];
  
  // let the grid know which columns and what data to use
  var gridOptions = {
    defaultColDef: {
      resizable: true,
     
    },
    columnDefs: columnDefs,
    rowData: rowData
  };


  function createNewRowData() {
    let valoareImpozit = 'DA';

    if(impozit.checked) {
        valoareImpozit = 'NU';
    } 

    var newData = {
      nume: `${nume.value}`,
      prenume: `${prenume.value}`,
      functie: `${functie.value}`,
      echipa: `${echipa.value}`,
      email: `${email.value}`,
      telefon: `${telefon.value}`,
      salariu: `${salariu.value}`,
      'scutit impozit': `${valoareImpozit}`,
    };

    return newData;
  }

  function addItems() {
    var newItems =  [createNewRowData()];
    gridOptions.api.applyTransaction({
      add: newItems,
      addIndex: 0,
    });
  }

  function createRowDataTable(nume, prenume, functie, echipa, email, telefon, salariu, impozit) {

    let tax = 'NU';

    if(impozit === true) {
      tax = 'DA';
    } 

    let newDataTable = {
      nume: `${nume}`,
      prenume: `${prenume}`,
      functie: `${functie}`,
      echipa: `${echipa}`,
      email: `${email}`,
      telefon: `${telefon}`,
      salariu: `${salariu}`,
      'scutit impozit': `${tax}`,
    }
    return newDataTable;
    }
  

    function onFilterTextBoxChanged() {
      gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);
  }

  // setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', function() {
      var gridDiv = document.querySelector('#myGrid');
      new agGrid.Grid(gridDiv, gridOptions);
      gridOptions.api.sizeColumnsToFit();
  });
 