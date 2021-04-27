/* Start HTTP */
const url = "http://localhost:8080/api/employee/";
let dataArray = [];

const select = document.querySelector("#selectare-angajat");
const vechime = document.querySelector("#vechime");
const pozitie = document.querySelector("#pozitie");
const echipa = document.querySelector("#echipa");
const numeAngajat = document.querySelector("#nume-angajat");
const email = document.querySelector("#adresa-email");
const telefon = document.querySelector("#nr-telefon");
const btnUpdateSalariu = document.querySelector("#btn-update-salariu");
const inputUpdateSalariu = document.querySelector("#input-update-salariu");

btnUpdateSalariu.addEventListener("click", function () {
  if (inputUpdateSalariu.value === ``) {
    alert("Nu ai introdus salariul nou!");
    return;
  }
  update(select.options[select.selectedIndex].value, inputUpdateSalariu.value);
});

let test1 = [];

const getAngajat = function (id) {
  axios
    .get(`http://localhost:8080/api/employee/${id}`)
    .then(function (response) {
      test1 = response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

axios
  .get(url)
  .then(function (response) {
    const options = response.data.data;
    dataArray = options;

    for (let i = 0; i < options.length; i++) {
      const opt = options[i].firstName + " " + options[i].surname;
      const el = document.createElement("option");
      el.textContent = opt;
      el.value = options[i]._id;
      select.appendChild(el);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

function start() {
  select.addEventListener("change", selectareAngajat, false);
  select.onchange = function (event) {
    // getAngajat(select.options[select.selectedIndex].value);

    // let id = select.options[select.selectedIndex].value;
    // axios
    // .get(`http://localhost:8080/api/employee/${id}`)
    // .then(function (response) {
    //   test1 = response.data.data;

    //   test1
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    // console.log(test1);

    vechime.innerHTML = `<strong>${
      dataArray[select.selectedIndex - 1].companyAge
    } ani</strong>`;
    pozitie.innerHTML = `${dataArray[select.selectedIndex - 1].position}`;
    echipa.innerHTML = `<strong>${
      dataArray[select.selectedIndex - 1].team
    }</string>`;
    email.innerHTML = `<strong>${
      dataArray[select.selectedIndex - 1].email
    }</strong>`;
    telefon.innerHTML = `<strong>0${
      dataArray[select.selectedIndex - 1].phone
    }</strong>`;
    numeAngajat.innerHTML = `${
      select.options[select.selectedIndex].textContent
    }`;
  };
}

function selectareAngajat() {
  // getAngajat(select.options[select.selectedIndex].value);
  if (select.value === "selectA") {
    vechime.style.display = "none";
    pozitie.style.display = "none";
    echipa.style.display = "none";
    salariuIntrodus.innerHTML = "";
    salariuRezultat.innerHTML = "";
    sumaCas.innerHTML = "";
    sumaCass.innerHTML = "";
    sumaImpozit.innerHTML = "";
    tipSalariuSelectat.innerHTML = "";
    tipSalariuIntrodus.innerHTML = "";
    return;
  }

  vechime.style.display = "block";
  pozitie.style.display = "block";
  echipa.style.display = "block";

  // Se calculeaza salariul net
  salariu = dataArray[select.selectedIndex - 1].salary;
  salariuIntrodus.innerHTML = salariu;

  cas = (25 * salariu) / 100;
  cass = (10 * salariu) / 100;

  let paysTax = dataArray[select.selectedIndex - 1].paysTax;

  if (paysTax) {
    scutitImpozit.innerHTML = `10%`;
    impozit = ((salariu - cas - cass) * 10) / 100;
  } else {
    impozit = 0;
    scutitImpozit.innerHTML = `0%`;
  }

  salariuNet = salariu - cas - cass - impozit;

  salariuRezultat.innerHTML = Math.round(salariuNet);
  sumaCas.innerHTML = Math.round(cas);
  sumaCass.innerHTML = Math.round(cass);
  sumaImpozit.innerHTML = Math.round(impozit);
  tipSalariuSelectat.innerHTML = "Net";
  tipSalariuIntrodus.innerHTML = "Brut";
}

const update = function (id, salariuNou) {
  axios
    .put(`http://localhost:8080/api/employee/${id}`, {
      salary: salariuNou,
    })
    .then(function (response) {
      console.log(response.data);
      salariu = inputUpdateSalariu.value;
      salariuIntrodus.innerHTML = salariu;
      cas = (25 * salariu) / 100;
      cass = (10 * salariu) / 100;

      let paysTax = select.options[select.selectedIndex].dataset.paysTax;

      if (paysTax === "false") {
        impozit = 0;
        scutitImpozit.innerHTML = `0%`;
      } else {
        scutitImpozit.innerHTML = `10%`;
        impozit = ((salariu - cas - cass) * 10) / 100;
      }

      salariuNet = salariu - cas - cass - impozit;

      salariuRezultat.innerHTML = Math.round(salariuNet);
      sumaCas.innerHTML = Math.round(cas);
      sumaCass.innerHTML = Math.round(cass);
      sumaImpozit.innerHTML = Math.round(impozit);
      tipSalariuSelectat.innerHTML = "Net";
      tipSalariuIntrodus.innerHTML = "Brut";
    });
};

window.addEventListener("load", start, false);
/* End HTTP */

const buttonToggle = document.querySelector("#toggle-selectare");

// buttonToggle.addEventListener("click", () => {
//   var x = document.getElementById("raport-salariu");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// });

// Selectare elemente calculator salariu
const button = document.querySelector("#calculeaza");
const inputSalariu = document.querySelector("#salariu");
const salariuNetCheck = document.querySelector("#salariu-net");
const salariuBrutCheck = document.querySelector("#salariu-brut");
const scutitImpozitCheck = document.querySelector("#scutit-impozit");

// Selectare elemente raport
const salariuIntrodus = document.querySelector("#salariu-introdus");
const salariuRezultat = document.querySelector("#salariu-rezultat");
const sumaImpozit = document.querySelector("#suma-impozit");
const sumaCass = document.querySelector("#suma-cass");
const sumaCas = document.querySelector("#suma-cas");
const tipSalariuSelectat = document.querySelector("#tip-salariu-selectat");
const tipSalariuIntrodus = document.querySelector("#tip-salariu-introdus");
const scutitImpozit = document.querySelector("#scutit-impozit-procent");

// Actionare buton
button.addEventListener("click", () => {
  if (inputSalariu.value === "") {
    alert("Nu ai introdus salariul!");
    return;
  }

  vechime.innerHTML = ``;
  pozitie.innerHTML = `Functie`;
  echipa.innerHTML = ``;
  email.innerHTML = ``;
  telefon.innerHTML = ``;
  numeAngajat.innerHTML = `Nume`;

  let salariu = inputSalariu.value;
  let cass = 0;
  let cas = 0;
  let impozit = 0;
  let salariuBrut = 0;
  let salariuNet = 0;

  salariuIntrodus.innerHTML = salariu;

  if (salariuNetCheck.checked) {
    // Se calculeaza salariul net

    cas = (25 * salariu) / 100;
    cass = (10 * salariu) / 100;

    if (scutitImpozitCheck.checked) {
      impozit = 0;
      scutitImpozit.innerHTML = `0%`;
    } else {
      scutitImpozit.innerHTML = `10%`;
      impozit = ((salariu - cas - cass) * 10) / 100;
    }

    salariuNet = salariu - cas - cass - impozit;

    salariuRezultat.innerHTML = Math.round(salariuNet);
    sumaCas.innerHTML = Math.round(cas);
    sumaCass.innerHTML = Math.round(cass);
    sumaImpozit.innerHTML = Math.round(impozit);
    tipSalariuSelectat.innerHTML = "Net";
    tipSalariuIntrodus.innerHTML = "Brut";
  } else if (salariuBrutCheck.checked) {
    // Se calculeaza salariul brut

    if (scutitImpozitCheck.checked) {
      scutitImpozit.innerHTML = `0%`;
      salariuBrut = salariu / 0.65;
      cas = (25 * salariuBrut) / 100;
      cass = (10 * salariuBrut) / 100;
      impozit = 0;
    } else {
      scutitImpozit.innerHTML = `10%`;
      salariuBrut = salariu / 0.585;
      cas = (25 * salariuBrut) / 100;
      cass = (10 * salariuBrut) / 100;
      impozit = ((salariuBrut - cas - cass) * 10) / 100;
    }

    salariuRezultat.innerHTML = Math.round(salariuBrut);
    sumaCas.innerHTML = Math.round(cas);
    sumaCass.innerHTML = Math.round(cass);
    sumaImpozit.innerHTML = Math.round(impozit);
    tipSalariuSelectat.innerHTML = "Brut";
    tipSalariuIntrodus.innerHTML = "Net";
  } else {
    alert("Nu ai selectat tipul salariului pe care vrei sa il calculezi!");
    return;
  }

  inputSalariu.value = "";
});
