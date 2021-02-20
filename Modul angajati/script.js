

/* Start HTTP */
const url = "angajati.json";

axios
  .get(url)
  .then(function (response) {
    const options = response.data;

    for (let i = 0; i < options.length; i++) {
      let newItem =  [createRowDataTable(options[i].name.firstName, options[i].name.surname, options[i].position, options[i].team, options[i].email, options[i].phone, options[i].salary, options[i].paysTax)];
      gridOptions.api.applyTransaction({
        add: newItem,
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });

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
    "salary": `${salariu.value}`
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


button.addEventListener("click", addItems);

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
    let valoareImpozit = 'NU';

    if(impozit.checked) {
        valoareImpozit = 'DA';
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
 