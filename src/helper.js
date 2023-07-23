export const pickHighest = (obj, num = 1) => {
    const requiredObj = {};
    if (num > Object.keys(obj).length) {
        return false;
    };
    Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, ind) => {
        if (ind < num) {
            requiredObj[key] = obj[key];
        }
    });
    return requiredObj;
};

export const calculateGenderDataTotal = (obj) => {
    let femaleCount = 0;
    let maleCount = 0;
    let undefinedCount = 0;
    Object.keys(obj).forEach(val => {
        if (val.includes("F.")) {
            femaleCount = femaleCount + obj[val];
        } else if (val.includes("M.")) {
            maleCount = maleCount + obj[val];
        } else {
            undefinedCount = undefinedCount + obj[val];
        }
    });
    return {"Female": femaleCount, "Male": maleCount};
}

export const countryCodesWithNames = {
    "AE": "United Arab Emirates",
    "AR": "Argentina",
    "AU": "Australia",
    "BD": "Bangladesh",
    "BH": "Bahrain",
    "BO": "Bolivia",
    "BR": "Brazil",
    "CA": "Canada",
    "CL": "Chile",
    "CO": "Colombia",
    "DE": "Germany",
    "DO": "Dominican Republic",
    "DZ": "Algeria",
    "EC": "Ecuador",
    "EG": "Egypt",
    "ES": "Spain",
    "FR": "France",
    "GB": "United Kingdom",
    "GE": "Georgia",
    "ID": "Indonesia",
    "IN": "India",
    "IQ": "Iraq",
    "IR": "Iran",
    "IT": "Italy",
    "KG": "Kyrgyzstan",
    "KZ": "Kazakhstan",
    "LA": "Laos",
    "MA": "Morocco",
    "MX": "Mexico",
    "MY": "Malaysia",
    "NG": "Nigeria",
    "PE": "Peru",
    "PH": "Philippines",
    "PK": "Pakistan",
    "PR": "Puerto Rico",
    "RU": "Russia",
    "SA": "Saudi Arabia",
    "TH": "Thailand",
    "TR": "Turkey",
    "UA": "Ukraine",
    "US": "United States",
    "UZ": "Uzbekistan",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "ZA": "South Africa"
}

export const apiResponse = {
    "data": {
        "data": [
            {
                "name": "audience_country",
                "period": "lifetime",
                "values": [
                    {
                        "value": {
                            "DE": 147,
                            "BD": 116,
                            "PR": 196,
                            "RU": 258,
                            "BH": 144,
                            "DO": 166,
                            "FR": 208,
                            "UA": 312,
                            "BO": 113,
                            "SA": 176,
                            "BR": 101709,
                            "MA": 298,
                            "DZ": 119,
                            "GB": 289,
                            "ID": 1309,
                            "KG": 443,
                            "GE": 137,
                            "CA": 451,
                            "EC": 778,
                            "US": 24513,
                            "EG": 166,
                            "AE": 211,
                            "UZ": 418,
                            "IN": 5100,
                            "ZA": 315,
                            "IQ": 212,
                            "CL": 223,
                            "IR": 239,
                            "IT": 364,
                            "MX": 1508,
                            "CO": 600,
                            "MY": 679,
                            "ES": 636,
                            "KZ": 179,
                            "VE": 416,
                            "AR": 1043,
                            "AU": 120,
                            "TH": 186,
                            "PE": 168,
                            "LA": 179,
                            "VN": 765,
                            "PH": 852,
                            "NG": 234,
                            "PK": 262,
                            "TR": 835
                        }
                    }
                ],
                "title": "Audience Country",
                "description": "The countries of this profile's followers",
                "id": "17841404972239663/insights/audience_country/lifetime"
            },
            {
                "name": "audience_city",
                "period": "lifetime",
                "values": [
                    {
                        "value": {
                            "Ribeirão Prêto, São Paulo (state)": 690,
                            "São Paulo, São Paulo (state)": 6219,
                            "Bishkek, Bishkek": 332,
                            "Hialeah, Florida": 592,
                            "Pelotas, Rio Grande do Sul": 450,
                            "Rio de Janeiro, Rio de Janeiro (state)": 1978,
                            "São José dos Campos, São Paulo (state)": 778,
                            "São Vicente, São Paulo (state)": 523,
                            "Contagem, Minas Gerais": 698,
                            "Osasco, São Paulo (state)": 368,
                            "Praia Grande, São Paulo (state)": 383,
                            "Porto Alegre, Rio Grande do Sul": 786,
                            "Campo Grande, Mato Grosso do Sul": 484,
                            "Duque de Caxias, Rio de Janeiro (state)": 388,
                            "Gravataí, Rio Grande do Sul": 333,
                            "Limeira, São Paulo (state)": 343,
                            "Rio Grande, Rio Grande do Sul": 435,
                            "Guarujá, São Paulo (state)": 366,
                            "Guarulhos, São Paulo (state)": 1176,
                            "Sorocaba, São Paulo (state)": 534,
                            "Santos, São Paulo (state)": 325,
                            "Piracicaba, São Paulo (state)": 454,
                            "São Bernardo do Campo, São Paulo (state)": 864,
                            "Betim, Minas Gerais": 569,
                            "Pindamonhangaba, São Paulo (state)": 360,
                            "Mauá, São Paulo (state)": 368,
                            "Jacareí, São Paulo (state)": 438,
                            "Fortaleza, Ceará": 363,
                            "Goiânia, Goiás": 462,
                            "Ribeirão das Neves, Minas Gerais": 512,
                            "Caxias do Sul, Rio Grande do Sul": 427,
                            "Santa Luzia, Minas Gerais": 331,
                            "New York, New York": 1059,
                            "Ibirité, Minas Gerais": 338,
                            "Juiz de Fora, Minas Gerais": 353,
                            "Diadema, São Paulo (state)": 386,
                            "Belo Horizonte, Minas Gerais": 1804,
                            "São José do Rio Prêto, São Paulo (state)": 550,
                            "Santo André, São Paulo (state)": 512,
                            "Curitiba, Paraná": 844,
                            "Hortolândia, São Paulo (state)": 362,
                            "Campinas, São Paulo (state)": 915,
                            "Sumaré, São Paulo (state)": 395,
                            "Miami, Florida": 1020,
                            "São Gonçalo, Rio de Janeiro (state)": 422
                        }
                    }
                ],
                "title": "Audience City",
                "description": "The cities of this profile's followers",
                "id": "17841404972239663/insights/audience_city/lifetime"
            },
            {
                "name": "audience_gender_age",
                "period": "lifetime",
                "values": [
                    {
                        "value": {
                            "F.13-17": 772,
                            "F.18-24": 2228,
                            "F.25-34": 8690,
                            "F.35-44": 9223,
                            "F.45-54": 4084,
                            "F.55-64": 1062,
                            "F.65+": 417,
                            "M.13-17": 1382,
                            "M.18-24": 2788,
                            "M.25-34": 2679,
                            "M.35-44": 2033,
                            "M.45-54": 890,
                            "M.55-64": 309,
                            "M.65+": 171,
                            "U.13-17": 9960,
                            "U.18-24": 18378,
                            "U.25-34": 18252,
                            "U.35-44": 38505,
                            "U.45-54": 22516,
                            "U.55-64": 5826,
                            "U.65+": 911
                        }
                    }
                ],
                "title": "Gender and Age",
                "description": "The gender and age distribution of this profile's followers",
                "id": "17841404972239663/insights/audience_gender_age/lifetime"
            }
        ]
    }
}