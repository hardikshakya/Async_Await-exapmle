const axios = require('axios');

// const getExchangeRate = (from, to) => {
//     return axios.get(`http://data.fixer.io/api/latest?access_key=API_KEY`).then((response) => {
//     const euro = 1/response.data.rates[from];
//     return euro * response.data.rates[to];
//     });
// }

const getExchangeRate = async (from, to) => {
    try{
        const response = await axios.get(`http://data.fixer.io/api/latest?access_key=API_KEY`);

        const euro = 1/response.data.rates[from];
        const rate =  euro * response.data.rates[to];

        if(rate) {
            return rate;
        } else {
            throw new Error();
        }
    } catch(e) {
        throw new Error(`Unale to get exchange rate for ${from} and ${to}.`);
    }
    
};

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name);
//     });
// };

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}.`);
    }
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

convertCurrencyAlt('USD', 'CAD', 1000).then((status) => {
    console.log(status);    
}).catch((e) => {
    console.log(e.message);    
});
