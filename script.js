const countriesContainer = document.querySelector('.countries-container');
const selectFilter = document.querySelector('.select-filter');
const searchInput = document.querySelector('.search-box input');
const DarkMode = document.querySelector('.darkmode');
const darkmodeText = document.querySelector('.darkmode-text');
const body = document.querySelector('body');
let allcountryData;

DarkMode.addEventListener('click', () => {
   body.classList.toggle('darkMode');
    
    if(body.classList.contains('darkMode')){
        darkmodeText.innerHTML = 'Light Mode';
    }else{
        darkmodeText.innerHTML = 'Dark Mode';
    }
})

fetch('data.json').then((res) => res.json())
    .then((data) => {
        countriesContainer.innerHTML = '';
        data.forEach(country => {
            const countryCard = document.createElement('a');
            countryCard.classList.add('country-card')
            countryCard.href = `country.html?name=${country.name}`

            countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="flag">
                
                <div class="card-text">
                   <h3 class="card-title">${country.name}</h3>
                    <p><b>Populaion: </b>${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Capital: </b>${country.capital??' '}</p>
                </div>
            `;
            countriesContainer.append(countryCard)
        });

        allcountryData = data;
    })




selectFilter.addEventListener('change', (e) => {
    fetch(`data.json`).then((res) => res.json())
        .then((data) => {
            countriesContainer.innerHTML = '';
            data.forEach((val) => { 
                if(val.region == selectFilter.value){
                    const countryCard = document.createElement('a');
                    countryCard.classList.add('country-card')
                    countryCard.href = `country.html?name=${val.name}`

                    countryCard.innerHTML = `
                        <img src="${val.flags.svg}" alt="flag">
                
                        <div class="card-text">
                            <h3 class="card-title">${val.name}</h3>
                            <p><b>Populaion: </b>${val.population.toLocaleString('en-IN')}</p>
                            <p><b>Region: </b>${val.region}</p>
                            <p><b>Capital: </b>${val.capital??' '}</p>
                        </div>
                    `;
                    countriesContainer.append(countryCard)
                }
            })    
        })
})


searchInput.addEventListener('input', (e) => {
    fetch('data.json').then((res) => res.json())
        .then((data) => {

            const filteredCountries = allcountryData.filter((country) => country.name.toLowerCase().includes(e.target.value.toLowerCase()))


            countriesContainer.innerHTML = '';
            filteredCountries.forEach(country => {
                const countryCard = document.createElement('a');
                countryCard.classList.add('country-card')
                countryCard.href = `country.html?name=${country.name}`

                countryCard.innerHTML = `
                    <img src="${country.flags.svg}" alt="flag">
                
                    <div class="card-text">
                        <h3 class="card-title">${country.name}</h3>
                        <p><b>Populaion: </b>${country.population.toLocaleString('en-IN')}</p>
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital??' '}</p>
                    </div>
                `;
                countriesContainer.append(countryCard)
            });
        })
})