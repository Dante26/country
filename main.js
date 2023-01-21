import './style.css';
import snackbar from "snackbar";
import FetchWrapper from "./fetch-wrapper.js";
import {hasCapital, populationFormat} from "./helpers.js";

const API = new FetchWrapper(`https://restcountries.com/v3.1`);

const countriesList = document.querySelector("#countries-cards");
const countrySearch = document.querySelector("#country-search");
const regionFilter = document.querySelector("#region-filter");
const resetButton = document.querySelector("#reset-button");

const init = (query = "", select = "") =>{
    API.get(`/all`).then(data =>{
        const betterQuery = query.trim().toLowerCase();
        const filteredList = data.filter(country =>{
            const filtration = country.name.common.toLowerCase().includes(betterQuery) && country.continents[0].includes(select);
            return filtration;
        });
        countriesList.innerHTML = "";
        filteredList.forEach(country =>{
            countriesList.insertAdjacentHTML("beforeend", `<div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <div class="card" style="width: 18rem;">
              <img src="${country.flags.png}" class="card-img-top" alt="..." style="width: 287px;height: 180px;">
              <div class="card-body">
                <h4 class="card-title">${country.name.common}</h4>
                <p class="card-text"><em>Population:</em> ${populationFormat(country.population)}</p>
                <p class="card-text"><em>Region:</em> ${country.region}</p>
                <p class="card-text"><em>Capital:</em> ${hasCapital(country.capital)}</p>
                <p class="card-text"><em>Driving side:</em> ${country.car.side}</p>
                <p class="card-text"><em>Domain:</em> ${country.tld}</p>
              </div>
            </div>
          </div>`);
        });
    }).catch(error =>{
      console.error(error);
    });
}

countrySearch.addEventListener("keyup", event =>{
    init(countrySearch.value, undefined);
});

regionFilter.addEventListener("change", event =>{
    init(undefined, regionFilter.value);
});

resetButton.addEventListener("click", event =>{
    init("", "");
    countrySearch.value = "";
    regionFilter.value = "";
    snackbar.show("Filters have been reset");
});

init();
