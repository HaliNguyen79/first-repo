const API_KEY = "bf2ae496-ab7d-48e7-86d2-141d5a785cca";
const BASE_URL = `https://holidayapi.com/v1`;

//Render Countries List
async function getCountryList() {
    try {
      const request = `${BASE_URL}/countries?key=${API_KEY}`
      const response = await fetch(request);
      console.log(request)
      if (response.ok) {
        const data = await response.json(); 
        // console.log("data",data);
        return data;
      }
    } catch(error) {
      console.log(error);
      return [];
    }  
  }
  getCountryList();
  
  async function renderCountries () {
    const data = await getCountryList();
    const countriesList = document.getElementById("countries-list"); //why?
    const ulCountriesList = countriesList.children[2];
    ulCountriesList.innerHTML = "";
    data.countries.forEach((country, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
            <div class="li-wrapper">
                <div class="li-title">${country.name}</div>
                <div>Code: ${country.code}</div>
            </div>`;
      ulCountriesList.appendChild(x);
  })
    // function renderCountry({code, name}){
    //     // console.log("Code: "+ code + "Name: " + name);
    //      renderCountry(country);
  }
  document.getElementById("countries-list-btn").addEventListener("click", () => {
  renderCountries();
});

  //Render Language List
  async function getLanguageList() {
    try {
      const response = await fetch(`${BASE_URL}/languages?key=${API_KEY}`); 
      if (response.ok) {
        const data = await response.json(); 
        // console.log("data",data);
        return data;
      }
    } catch(error) {
      console.log(error);
      return [];
    }  
  }
  getLanguageList();

  async function renderLanguages() {
    const data = await getLanguageList();
    const ul = document.querySelector("#languages-list ul");
    ul.innerHTML = "";
    data.languages.forEach(({code, name}, index) => {
      const list = document.createElement("li");
      list.innerHTML = `
      <div class="bullet">${index + 1}</div>
      <div class="li-wrapper">
                      <div class="li-title">${name}</div>
                      <div class="li-text">Code:${code}</div>
                    </div>    `
      ul.appendChild(list);              
    });
  }
  const render = document.querySelector("#languages-list-btn");
  render.addEventListener("click", renderLanguages);


  //Get Holiday List
  const search = document.querySelector("#search-query");
  const month = document.querySelector("#month-query");
  const day = document.querySelector("#day-query");
  const language = document.querySelector("#language-query");
  const year = document.querySelector("#year-query");
  const country = document.querySelector("#country-query");
  
   async function getHolidays () {
    try {
    //built-in web API coming with modern browsers
    const params = new URLSearchParams(); 
    // Add values if present
    if (search.value) params.append("search", search.value);
    if (month.value) params.append("month", month.value);
    if (day.value) params.append("day", day.value);
    if (language.value) params.append("language", language.value);
    // Reuired params
    params.append("year", year.value || "2024");
    params.append("country", country.value || "VN");

    // Add API key and other fixed params
    params.append("pretty", "true");
    params.append("key", API_KEY);

    const url = `https://holidayapi.com/v1/holidays?${params.toString()}`;

    let queryStr = `key=${API_KEY}&country=${country.value || 'VN'}&year=${year.value || 2024}`
    if (search.value) {
      queryStr += `&search=${search.value}`;
    }

    if (month.value) params.append("month", month.value);
    if (day.value) params.append("day", day.value);
    if (language.value) params.append("language", language.value);

    //fetch the data
    const response = await fetch(url);
    const data = await response.json();
    console.log("holiday:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
getHolidays();
function test(params) {
  console.log('test: ', params);
  
}
async function renderHolidays () {
  const {holidays} = await getHolidays();
  const ul = document.querySelector("#holidays-list ul");
  ul.innerHTML = "";
  holidays.forEach(test);
  holidays.forEach(({name, date}, index) => {
    const list = document.createElement("li");
    list.innerHTML = ` <div class="bullet">${index + 1}</div>
                    <div class="li-wrapper">
                      <div class="li-title">${name}</div>
                      <div class="li-text">${date}</div>
                    </div>     ` 
    ul.appendChild(list);                
  });
}
document.querySelector("#holidays-btn").addEventListener("click", renderHolidays);