const axios = require('axios');
//API_KEY you need to get from the their site by free sigm up
const getExchangeRate = (from, to) => {
    return axios.get(`http://data.fixer.io/api/latest?access_key=API_KEY`).then((response) => {
    const euro = 1/response.data.rates[from];
    return euro * response.data.rates[to];
    });
}

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => country.name);
    });
};

const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
    });
};

const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);

    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;

};

// convertCurrency('USD', 'INR', 1000).then((status) => {
//     console.log(status);    
// });

convertCurrencyAlt('USD', 'INR', 1000).then((status) => {
    console.log(status);    
});
