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
    return { "Female": femaleCount, "Male": maleCount };
}

export const countryCodesWithNames = {
    "AE": "United Arab Emirates",
    "AF": "Afghanistan",
    "AL": "Albania",
    "AM": "Armenia",
    "AO": "Angola",
    "AR": "Argentina",
    "AT": "Austria",
    "AU": "Australia",
    "AZ": "Azerbaijan",
    "BA": "Bosnia and Herzegovina",
    "BD": "Bangladesh",
    "BE": "Belgium",
    "BF": "Burkina Faso",
    "BG": "Bulgaria",
    "BH": "Bahrain",
    "BI": "Burundi",
    "BJ": "Benin",
    "BO": "Bolivia",
    "BR": "Brazil",
    "BT": "Bhutan",
    "BW": "Botswana",
    "BY": "Belarus",
    "BZ": "Belize",
    "CA": "Canada",
    "CD": "Democratic Republic of the Congo",
    "CF": "Central African Republic",
    "CG": "Republic of the Congo",
    "CH": "Switzerland",
    "CI": "Ivory Coast",
    "CL": "Chile",
    "CM": "Cameroon",
    "CN": "China",
    "CO": "Colombia",
    "CR": "Costa Rica",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DE": "Germany",
    "DJ": "Djibouti",
    "DK": "Denmark",
    "DO": "Dominican Republic",
    "DZ": "Algeria",
    "EC": "Ecuador",
    "EE": "Estonia",
    "EG": "Egypt",
    "ES": "Spain",
    "ET": "Ethiopia",
    "FI": "Finland",
    "FJ": "Fiji",
    "FR": "France",
    "GA": "Gabon",
    "GB": "United Kingdom",
    "GE": "Georgia",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GL": "Greenland",
    "GM": "Gambia",
    "GN": "Guinea",
    "GQ": "Equatorial Guinea",
    "GR": "Greece",
    "GT": "Guatemala",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HK": "Hong Kong",
    "HN": "Honduras",
    "HR": "Croatia",
    "HT": "Haiti",
    "HU": "Hungary",
    "ID": "Indonesia",
    "IE": "Ireland",
    "IL": "Israel",
    "IN": "India",
    "IQ": "Iraq",
    "IR": "Iran",
    "IT": "Italy",
    "JM": "Jamaica",
    "JO": "Jordan",
    "JP": "Japan",
    "KE": "Kenya",
    "KG": "Kyrgyzstan",
    "KH": "Cambodia",
    "KI": "Kiribati",
    "KM": "Comoros",
    "KN": "Saint Kitts and Nevis",
    "KP": "North Korea",
    "KR": "South Korea",
    "KW": "Kuwait",
    "KZ": "Kazakhstan",
    "LA": "Laos",
    "LB": "Lebanon",
    "LC": "Saint Lucia",
    "LI": "Liechtenstein",
    "LK": "Sri Lanka",
    "LR": "Liberia",
    "LS": "Lesotho",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "LV": "Latvia",
    "LY": "Libya",
    "MA": "Morocco",
    "MC": "Monaco",
    "MD": "Moldova",
    "ME": "Montenegro",
    "MG": "Madagascar",
    "MH": "Marshall Islands",
    "MK": "North Macedonia",
    "ML": "Mali",
    "MM": "Myanmar",
    "MN": "Mongolia",
    "MR": "Mauritania",
    "MT": "Malta",
    "MU": "Mauritius",
    "MV": "Maldives",
    "MW": "Malawi",
    "MX": "Mexico",
    "MY": "Malaysia",
    "MZ": "Mozambique",
    "NA": "Namibia",
    "NE": "Niger",
    "NG": "Nigeria",
    "NI": "Nicaragua",
    "NL": "Netherlands",
    "NO": "Norway",
    "NP": "Nepal",
    "NR": "Nauru",
    "NZ": "New Zealand",
    "OM": "Oman",
    "PA": "Panama",
    "PE": "Peru",
    "PG": "Papua New Guinea",
    "PH": "Philippines",
    "PK": "Pakistan",
    "PL": "Poland",
    "PR": "Puerto Rico",
    "PS": "Palestine",
    "PT": "Portugal",
    "PW": "Palau",
    "PY": "Paraguay",
    "QA": "Qatar",
    "RO": "Romania",
    "RS": "Serbia",
    "RU": "Russia",
    "RW": "Rwanda",
    "SA": "Saudi Arabia",
    "SB": "Solomon Islands",
    "SC": "Seychelles",
    "SD": "Sudan",
    "SE": "Sweden",
    "SG": "Singapore",
    "SI": "Slovenia",
    "SK": "Slovakia",
    "SL": "Sierra Leone",
    "SM": "San Marino",
    "SN": "Senegal",
    "SO": "Somalia",
    "SR": "Suriname",
    "SS": "South Sudan",
    "ST": "Sao Tome and Principe",
    "SV": "El Salvador",
    "SY": "Syria",
    "SZ": "Eswatini",
    "TD": "Chad",
    "TG": "Togo",
    "TH": "Thailand",
    "TJ": "Tajikistan",
    "TL": "Timor-Leste",
    "TM": "Turkmenistan",
    "TN": "Tunisia",
    "TO": "Tonga",
    "TR": "Turkey",
    "TT": "Trinidad and Tobago",
    "TV": "Tuvalu",
    "TW": "Taiwan",
    "TZ": "Tanzania",
    "UA": "Ukraine",
    "UG": "Uganda",
    "US": "United States",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VA": "Vatican City",
    "VC": "Saint Vincent and the Grenadines",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "VU": "Vanuatu",
    "WS": "Samoa",
    "YE": "Yemen",
    "ZA": "South Africa",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
}

export const mockResponse = {
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

export const mockResponseReach = {
    "data": [
        {
            "name": "impressions",
            "period": "day",
            "values": [
                {
                    "value": 16394,
                    "end_time": "2023-07-22T07:00:00+0000"
                },
                {
                    "value": 982,
                    "end_time": "2023-07-23T07:00:00+0000"
                }
            ],
            "title": "Impressions",
            "description": "Total number of times the Business Account's media objects have been viewed",
            "id": "17841404972239663/insights/impressions/day"
        },
        {
            "name": "reach",
            "period": "day",
            "values": [
                {
                    "value": 7332,
                    "end_time": "2023-07-22T07:00:00+0000"
                },
                {
                    "value": 475,
                    "end_time": "2023-07-23T07:00:00+0000"
                }
            ],
            "title": "Reach",
            "description": "Total number of times the Business Account's media objects have been uniquely viewed",
            "id": "17841404972239663/insights/reach/day"
        },
        {
            "name": "profile_views",
            "period": "day",
            "values": [
                {
                    "value": 598,
                    "end_time": "2023-07-22T07:00:00+0000"
                },
                {
                    "value": 47,
                    "end_time": "2023-07-23T07:00:00+0000"
                }
            ],
            "title": "Profile Views",
            "description": "Total number of users who have viewed the Business Account's profile within the specified period",
            "id": "17841404972239663/insights/profile_views/day"
        }
    ],
    "paging": {
        "previous": "https://graph.facebook.com/v17.0/17841404972239663/insights?access_token=EAALiy21QNrYBACVsA60ZCjuq1DKMubXMoOVB7AcUOQoa6QscZBl396tCbH68GkeDTUv869YJVY6ibH4uYqEZAE4949Xdxwd9lqBAO4yq760d6ZAbXQZAj3XKOJNd1dSRlXzZArUAIct11tnzxZCLev6dvRYNe8O2hIvbmNsiuRHtHGqiZADUcq7P&metric=impressions%2Creach%2Cprofile_views&period=day&since=1689773397&until=1689946197",
        "next": "https://graph.facebook.com/v17.0/17841404972239663/insights?access_token=EAALiy21QNrYBACVsA60ZCjuq1DKMubXMoOVB7AcUOQoa6QscZBl396tCbH68GkeDTUv869YJVY6ibH4uYqEZAE4949Xdxwd9lqBAO4yq760d6ZAbXQZAj3XKOJNd1dSRlXzZArUAIct11tnzxZCLev6dvRYNe8O2hIvbmNsiuRHtHGqiZADUcq7P&metric=impressions%2Creach%2Cprofile_views&period=day&since=1690118999&until=1690291799"
    }
}