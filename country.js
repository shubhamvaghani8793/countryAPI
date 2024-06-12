const flagimg = document.querySelector('.country-details img');
const countryheading = document.querySelector('.country-details h2');
const nativeName = document.querySelector('.native-name');
const Cpopulation = document.querySelector('.populaion'); 
const Cregion = document.querySelector('.region');
const subRegionopulaion = document.querySelector('.sub-regionopulaion');
const Capital2 = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-level-domain');
const currency = document.querySelector('.currencies'); 
const language = document.querySelector('.languages');
const Border = document.querySelector('.border-countries');
const backbtn = document.querySelector('.back-button');

const countryName = new URLSearchParams(window.location.search).get('name');
// console.log(countryName);

backbtn.addEventListener('click', (e) => {
    history.back();
})

//https://restcountries.com/v3.1/name/${countryName}?fullText=true

fetch(`data.json`).then((res) => res.json())
    .then((data) => data.find((val) => val.name == countryName))
    .then((coun) => {
        console.log(coun);
        flagimg.src = coun.flags.svg;   
        countryheading.innerText = coun.name;

        if(coun.nativeName){
            nativeName.innerText = coun.nativeName;
        }else{
            nativeName.innerText = coun.name;
        }   

        Cpopulation.innerText = coun.population.toLocaleString('en-IN');
        Cregion.innerText = coun.region;
        
        if(coun.subregion){
            subRegionopulaion.innerText = coun.subregion;
        }

        if(coun.capital){
            Capital2.innerText = coun.capital??' ';
        }

        topLevelDomain.innerText = coun.topLevelDomain.join(', ');

        if(coun.currencies) {
            currency.innerText = Object.values(coun.currencies).map((val) => val.name).join(', ');
        }

        if(coun.languages){
            language.innerText = Object.values(coun.languages).map((val) => val.name).join(', ');
        }

        if(coun.borders){
            
            coun.borders.forEach((border) => {
                // console.log(border);
                fetch(`data.json`).then((res) => res.json())
                .then((data) => data.find((val) => val.alpha3Code == border))
                .then((coun) => {
                    // console.log(coun);
                        const borderCountryTag = document.createElement('a');
                        borderCountryTag.innerText = border
                        borderCountryTag.href = `country.html?name=${coun.name}`
                        Border.append(borderCountryTag)
                })
            });
        }
    })