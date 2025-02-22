const api_link = "https://restcountries.com/v3.1/all";

const block = document.querySelector(".block");
const box = document.querySelector(".box");
const search = document.querySelector(".search");
const animation = document.querySelector(".animation");

const getData = async (link) => {
  animation.classList.add("active")
  const req = await fetch(link);
  const data = await req.json();
  // console.log(data);

  WriteData(data);
  animation.classList.remove("active")
};


getData(api_link);

const WriteData = (data) => {
  data.forEach((item) => {
    

    block.innerHTML += `<div onclick="OneCounty('${item.name.common}')"   class="box">
                <img src="${item.flags.png}" alt="${item.name.common}" />
                <h3>${item.name.common}</h3>
                <div class="box_info">
                  <div class="info">
                    <h4>Population: </h4>
                    <p>${item.population}</p>
                  </div>
                  <div class="info">
                    <h4>Region: </h4>
                    <p class="RegionSearch"  >${item.region}</p>
                  </div>
                  <div class="info">
                    <h4>Capital:</h4>
                    <p> ${item.capital}</p>
                  </div>
                </div>
              </div>`;
  });
};

const sunmoon = document.querySelector(".sunmoon");
const body = document.querySelector("body");
// const RegionSearch = document.querySelector(".RegionSearch");
const select = document.querySelector("select");

var mood = localStorage.getItem("mood")
  ? localStorage.getItem("mood")
  : "light";

const WriteDataEl = () => {
  if (mood === "dark") {
    body.classList.add("dark");
    body.classList.remove("light");
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
  }
};

WriteDataEl();

sunmoon.addEventListener("click", () => {
  if (mood === "dark") {
    mood = "light";
  } else {
    mood = "dark";
  }

  localStorage.setItem("mood", mood);
  WriteDataEl();
});

search.addEventListener("input", () => {
  console.log(search.value);
  var countries = document.querySelectorAll(".box");

  countries.forEach((item) => {
    if (
      !item
        .querySelector("h3")
        .textContent.toLowerCase()
        .includes(search.value.toLowerCase())
    ) {
      item.classList.add("hidden");
    } else {
      item.classList.remove("hidden");
    }
  });
});


select.addEventListener("change", () => {
  // console.log(select.value);
  var countries = document.querySelectorAll(".box");

  countries.forEach((item) => {


 if(select.value != "all"){
  if (
    !item
      .querySelector(".RegionSearch")
      .textContent.toLowerCase()
      .includes(select.value.toLowerCase())
     
      

  ) {
    item.classList.add("hidden");
  } 
  else {
    item.classList.remove("hidden");
  }
 }else{
  item.classList.remove("hidden");
 }
  });
});


const boxInfo= document.querySelector(".boxInfo");




const OneCounty = async (nameEl)=>{

  const req = await fetch(`https://restcountries.com/v3.1/name/${nameEl}`);
  const data = await req.json();
  writeModal(data);
}
console.log(`https://restcountries.com/v3.1/name/uzbekistan
`);

const writeModal = (item)=>{
item.forEach((item) => {


const languageNames = Object.values(item.languages).join(", ");


  boxInfo.innerHTML = `<div class="container">
     
        <div class="LoaderImg">
          <button onclick="back" class="back"><i class="fa-solid fa-arrow-left"></i>Back</button>
          <img width="470px" src="${item.flags.png}" alt="" />
        </div>

        <div class="LoaderInfo">
          <div class="cards">
            <div class="card">
              <h1>${item.name.common}</h1>
              <div class="cardInfo">
                <h4>Native Name:</h4>
                <p>${item.name.common}</p>
              </div>
              <div class="cardInfo">
                <h4>
                  Population: 
                </h4>
                <p>
                ${item.population}
                </p>
              </div>
              <div class="cardInfo">
                <h4>
                  Region:
                </h4>
                <p>
                ${item.region}
                </p>
              </div>
              <div class="cardInfo">
                <h4>
                  Sub Region: 
                </h4>
                <p>
                 ${item.subregion}
                </p>
              </div>
              <div class="cardInfo">
                <h4>
                  Capital: 
                </h4>
                <p>
                ${item.capital}
                </p>
              </div>
            </div>
            <div class="card">
              <div class="cardInfo">
                <h4>Top Level Domain: </h4>
                <p> ${item.tld}</p>
              </div>
              <div class="cardInfo">
                <h4>
                  Currencies: 
                </h4>
                <p>
                  Euro 
                </p>
              </div>
              <div class="cardInfo">
                <h4>
                  Languages: 
                </h4>
                <p>
                  
             ${languageNames}
                </p>
              </div>
            
            </div>
           
          </div>
          <div class="BorderCountries">
            <h3>Border Countries: </h3>
            <button>France</button>
            <button>Germany</button>
            <button>Netherlands</button>
          </div> 
        </div>`;


        body.classList.add("active");
        const backButton = document.querySelector(".back");
        backButton.addEventListener("click", () => {
          body.classList.remove("active");
        });
  }); 

}