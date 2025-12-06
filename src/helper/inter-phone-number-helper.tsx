export const detectPhoneNumber = (phoneNumber:string) =>{
    if (phoneNumber.startsWith('+')) {
        // First, try to match by dial code + area code
        if (phoneNumber.startsWith('+1') && phoneNumber.length >= 5) {
            // Extract area code (first 3 digits after +1)
            const areaCode = phoneNumber.substring(2, 5);
            
            // Check if it's a valid 3-digit area code
            if (/^\d{3}$/.test(areaCode)) {
                const matchedByAreaCode = countryCodeList.find(
                    (country) =>
                    country.dialCode === '+1' &&
                    country.areaCodes?.includes(areaCode)
                );
                
                if (matchedByAreaCode) {
                    return {id:matchedByAreaCode.id, code:matchedByAreaCode.dialCode||'', flag:matchedByAreaCode.flag||''}
                }
            }
        }
        const sortedCountries = [...countryCodeList].sort(
            (a, b) => (b.dialCode as string).length - (a.dialCode as string).length
        );

        const matched = sortedCountries.find((country) =>
            phoneNumber.startsWith((country.dialCode as string))
        );

        return(matched?({id:matched.id, code:matched.dialCode||'', flag:matched.flag||''}):({id:'', code:'', flag:''}));
    }
    return({id:'', code:'', flag:''});
}

export const countryCodeList = [
    {
        "id": "AF",
        "name": "Afghanistan",
        "dialCode": "+93",
        "flag": "🇦🇫"
    },
    {
        "id": "AX",
        "name": "Åland Islands",
        "dialCode": "+358",
        "flag": "🇦🇽"
    },
    {
        "id": "AL",
        "name": "Albania",
        "dialCode": "+355",
        "flag": "🇦🇱"
    },
    {
        "id": "DZ",
        "name": "Algeria",
        "dialCode": "+213",
        "flag": "🇩🇿"
    },
    {
        "id": "AS",
        "name": "American Samoa",
        "dialCode": "+1684",
        "flag": "🇦🇸"
    },
    {
        "id": "AD",
        "name": "Andorra",
        "dialCode": "+376",
        "flag": "🇦🇩"
    },
    {
        "id": "AO",
        "name": "Angola",
        "dialCode": "+244",
        "flag": "🇦🇴"
    },
    {
        "id": "AI",
        "name": "Anguilla",
        "dialCode": "+1264",
        "flag": "🇦🇮"
    },
    {
        "id": "AQ",
        "name": "Antarctica",
        "dialCode": "+672",
        "flag": "🇦🇶"
    },
    {
        "id": "AG",
        "name": "Antigua and Barbuda",
        "dialCode": "+1268",
        "flag": "🇦🇬"
    },
    {
        "id": "AR",
        "name": "Argentina",
        "dialCode": "+54",
        "flag": "🇦🇷"
    },
    {
        "id": "AM",
        "name": "Armenia",
        "dialCode": "+374",
        "flag": "🇦🇲"
    },
    {
        "id": "AW",
        "name": "Aruba",
        "dialCode": "+297",
        "flag": "🇦🇼"
    },
    {
        "id": "AU",
        "name": "Australia",
        "dialCode": "+61",
        "flag": "🇦🇺"
    },
    {
        "id": "AT",
        "name": "Austria",
        "dialCode": "+43",
        "flag": "🇦🇹"
    },
    {
        "id": "AZ",
        "name": "Azerbaijan",
        "dialCode": "+994",
        "flag": "🇦🇿"
    },
    {
        "id": "BS",
        "name": "Bahamas",
        "dialCode": "+1242",
        "flag": "🇧🇸"
    },
    {
        "id": "BH",
        "name": "Bahrain",
        "dialCode": "+973",
        "flag": "🇧🇭"
    },
    {
        "id": "BD",
        "name": "Bangladesh",
        "dialCode": "+880",
        "flag": "🇧🇩"
    },
    {
        "id": "BB",
        "name": "Barbados",
        "dialCode": "+1246",
        "flag": "🇧🇧"
    },
    {
        "id": "BY",
        "name": "Belarus",
        "dialCode": "+375",
        "flag": "🇧🇾"
    },
    {
        "id": "BE",
        "name": "Belgium",
        "dialCode": "+32",
        "flag": "🇧🇪"
    },
    {
        "id": "BZ",
        "name": "Belize",
        "dialCode": "+501",
        "flag": "🇧🇿"
    },
    {
        "id": "BJ",
        "name": "Benin",
        "dialCode": "+229",
        "flag": "🇧🇯"
    },
    {
        "id": "BM",
        "name": "Bermuda",
        "dialCode": "+1441",
        "flag": "🇧🇲"
    },
    {
        "id": "BT",
        "name": "Bhutan",
        "dialCode": "+975",
        "flag": "🇧🇹"
    },
    {
        "id": "BO",
        "name": "Bolivia",
        "dialCode": "+591",
        "flag": "🇧🇴"
    },
    {
        "id": "BA",
        "name": "Bosnia and Herzegovina",
        "dialCode": "+387",
        "flag": "🇧🇦"
    },
    {
        "id": "BW",
        "name": "Botswana",
        "dialCode": "+267",
        "flag": "🇧🇼"
    },
    {
        "id": "BV",
        "name": "Bouvet Island",
        "dialCode": "+47",
        "flag": "🇧🇻"
    },
    {
        "id": "BR",
        "name": "Brazil",
        "dialCode": "+55",
        "flag": "🇧🇷"
    },
    {
        "id": "IO",
        "name": "British Indian Ocean Territory",
        "dialCode": "+246",
        "flag": "🇮🇴"
    },
    {
        "id": "BN",
        "name": "Brunei Darussalam",
        "dialCode": "+673",
        "flag": "🇧🇳"
    },
    {
        "id": "BG",
        "name": "Bulgaria",
        "dialCode": "+359",
        "flag": "🇧🇬"
    },
    {
        "id": "BF",
        "name": "Burkina Faso",
        "dialCode": "+226",
        "flag": "🇧🇫"
    },
    {
        "id": "BI",
        "name": "Burundi",
        "dialCode": "+257",
        "flag": "🇧🇮"
    },
    {
        "id": "KH",
        "name": "Cambodia",
        "dialCode": "+855",
        "flag": "🇰🇭"
    },
    {
        "id": "CM",
        "name": "Cameroon",
        "dialCode": "+237",
        "flag": "🇨🇲"
    },
    {
        "id": "CA",
        "name": "Canada",
        "dialCode": "+1",
        "areaCodes": ['204', '226', '236', '249', '250', '263', '289', '306', '343', '354', '365', '367', '368', '382', '403', '416', '418', '428', '431', '437', '438', '450', '468', '474', '506', '514', '519', '548', '579', '581', '584', '587', '604', '613', '639', '647', '672', '683', '705', '709', '778', '780', '782', '807', '819', '825', '867', '873', '902', '905'],
        "flag": "🇨🇦",
    },
    {
        "id": "CV",
        "name": "Cape Verde",
        "dialCode": "+238",
        "flag": "🇨🇻"
    },
    {
        "id": "KY",
        "name": "Cayman Islands",
        "dialCode": "+1345",
        "flag": "🇰🇾"
    },
    {
        "id": "CF",
        "name": "Central African Republic",
        "dialCode": "+236",
        "flag": "🇨🇫"
    },
    {
        "id": "TD",
        "name": "Chad",
        "dialCode": "+235",
        "flag": "🇹🇩"
    },
    {
        "id": "CL",
        "name": "Chile",
        "dialCode": "+56",
        "flag": "🇨🇱"
    },
    {
        "id": "CN",
        "name": "China",
        "dialCode": "+86",
        "flag": "🇨🇳"
    },
    {
        "id": "CX",
        "name": "Christmas Island",
        "dialCode": "+61",
        "flag": "🇨🇽"
    },
    {
        "id": "CC",
        "name": "Cocos (Keeling) Islands",
        "dialCode": "+61",
        "flag": "🇨🇨"
    },
    {
        "id": "CO",
        "name": "Colombia",
        "dialCode": "+57",
        "flag": "🇨🇴"
    },
    {
        "id": "KM",
        "name": "Comoros",
        "dialCode": "+269",
        "flag": "🇰🇲"
    },
    {
        "id": "CG",
        "name": "Congo",
        "dialCode": "+242",
        "flag": "🇨🇬"
    },
    {
        "id": "CD",
        "name": "Congo, The Democratic Republic of the Congo",
        "dialCode": "+243",
        "flag": "🇨🇩"
    },
    {
        "id": "CK",
        "name": "Cook Islands",
        "dialCode": "+682",
        "flag": "🇨🇰"
    },
    {
        "id": "CR",
        "name": "Costa Rica",
        "dialCode": "+506",
        "flag": "🇨🇷"
    },
    {
        "id": "CI",
        "name": "Côte d'Ivoire",
        "dialCode": "+225",
        "flag": "🇨🇮"
    },
    {
        "id": "HR",
        "name": "Croatia",
        "dialCode": "+385",
        "flag": "🇭🇷"
    },
    {
        "id": "CU",
        "name": "Cuba",
        "dialCode": "+53",
        "flag": "🇨🇺"
    },
    {
        "id": "CY",
        "name": "Cyprus",
        "dialCode": "+357",
        "flag": "🇨🇾"
    },
    {
        "id": "CZ",
        "name": "Czech Republic",
        "dialCode": "+420",
        "flag": "🇨🇿"
    },
    {
        "id": "DK",
        "name": "Denmark",
        "dialCode": "+45",
        "flag": "🇩🇰"
    },
    {
        "id": "DJ",
        "name": "Djibouti",
        "dialCode": "+253",
        "flag": "🇩🇯"
    },
    {
        "id": "DM",
        "name": "Dominica",
        "dialCode": "+1767",
        "flag": "🇩🇲"
    },
    {
        "id": "DO",
        "name": "Dominican Republic",
        "dialCode": "+1849",
        "flag": "🇩🇴"
    },
    {
        "id": "EC",
        "name": "Ecuador",
        "dialCode": "+593",
        "flag": "🇪🇨"
    },
    {
        "id": "EG",
        "name": "Egypt",
        "dialCode": "+20",
        "flag": "🇪🇬"
    },
    {
        "id": "SV",
        "name": "El Salvador",
        "dialCode": "+503",
        "flag": "🇸🇻"
    },
    {
        "id": "GQ",
        "name": "Equatorial Guinea",
        "dialCode": "+240",
        "flag": "🇬🇶"
    },
    {
        "id": "ER",
        "name": "Eritrea",
        "dialCode": "+291",
        "flag": "🇪🇷"
    },
    {
        "id": "EE",
        "name": "Estonia",
        "dialCode": "+372",
        "flag": "🇪🇪"
    },
    {
        "id": "ET",
        "name": "Ethiopia",
        "dialCode": "+251",
        "flag": "🇪🇹"
    },
    {
        "id": "FK",
        "name": "Falkland Islands (Malvinas)",
        "dialCode": "+500",
        "flag": "🇫🇰"
    },
    {
        "id": "FO",
        "name": "Faroe Islands",
        "dialCode": "+298",
        "flag": "🇫🇴"
    },
    {
        "id": "FJ",
        "name": "Fiji",
        "dialCode": "+679",
        "flag": "🇫🇯"
    },
    {
        "id": "FI",
        "name": "Finland",
        "dialCode": "+358",
        "flag": "🇫🇮"
    },
    {
        "id": "FR",
        "name": "France",
        "dialCode": "+33",
        "flag": "🇫🇷"
    },
    {
        "id": "GF",
        "name": "French Guiana",
        "dialCode": "+594",
        "flag": "🇬🇫"
    },
    {
        "id": "PF",
        "name": "French Polynesia",
        "dialCode": "+689",
        "flag": "🇵🇫"
    },
    {
        "id": "TF",
        "name": "French Southern Territories",
        "dialCode": "+262",
        "flag": "🇹🇫"
    },
    {
        "id": "GA",
        "name": "Gabon",
        "dialCode": "+241",
        "flag": "🇬🇦"
    },
    {
        "id": "GM",
        "name": "Gambia",
        "dialCode": "+220",
        "flag": "🇬🇲"
    },
    {
        "id": "GE",
        "name": "Georgia",
        "dialCode": "+995",
        "flag": "🇬🇪"
    },
    {
        "id": "DE",
        "name": "Germany",
        "dialCode": "+49",
        "flag": "🇩🇪"
    },
    {
        "id": "GH",
        "name": "Ghana",
        "dialCode": "+233",
        "flag": "🇬🇭"
    },
    {
        "id": "GI",
        "name": "Gibraltar",
        "dialCode": "+350",
        "flag": "🇬🇮"
    },
    {
        "id": "GR",
        "name": "Greece",
        "dialCode": "+30",
        "flag": "🇬🇷"
    },
    {
        "id": "GL",
        "name": "Greenland",
        "dialCode": "+299",
        "flag": "🇬🇱"
    },
    {
        "id": "GD",
        "name": "Grenada",
        "dialCode": "+1473",
        "flag": "🇬🇩"
    },
    {
        "id": "GP",
        "name": "Guadeloupe",
        "dialCode": "+590",
        "flag": "🇬🇵"
    },
    {
        "id": "GU",
        "name": "Guam",
        "dialCode": "+1671",
        "flag": "🇬🇺"
    },
    {
        "id": "GT",
        "name": "Guatemala",
        "dialCode": "+502",
        "flag": "🇬🇹"
    },
    {
        "id": "GG",
        "name": "Guernsey",
        "dialCode": "+44",
        "flag": "🇬🇬"
    },
    {
        "id": "GN",
        "name": "Guinea",
        "dialCode": "+224",
        "flag": "🇬🇳"
    },
    {
        "id": "GW",
        "name": "Guinea-Bissau",
        "dialCode": "+245",
        "flag": "🇬🇼"
    },
    {
        "id": "GY",
        "name": "Guyana",
        "dialCode": "+592",
        "flag": "🇬🇾"
    },
    {
        "id": "HT",
        "name": "Haiti",
        "dialCode": "+509",
        "flag": "🇭🇹"
    },
    {
        "id": "HM",
        "name": "Heard Island and Mcdonald Islands",
        "dialCode": "+672",
        "flag": "🇭🇲"
    },
    {
        "id": "VA",
        "name": "Holy See (Vatican City State)",
        "dialCode": "+379",
        "flag": "🇻🇦"
    },
    {
        "id": "HN",
        "name": "Honduras",
        "dialCode": "+504",
        "flag": "🇭🇳"
    },
    {
        "id": "HK",
        "name": "Hong Kong",
        "dialCode": "+852",
        "flag": "🇭🇰"
    },
    {
        "id": "HU",
        "name": "Hungary",
        "dialCode": "+36",
        "flag": "🇭🇺"
    },
    {
        "id": "IS",
        "name": "Iceland",
        "dialCode": "+354",
        "flag": "🇮🇸"
    },
    {
        "id": "IN",
        "name": "India",
        "dialCode": "+91",
        "flag": "🇮🇳"
    },
    {
        "id": "ID",
        "name": "Indonesia",
        "dialCode": "+62",
        "flag": "🇮🇩"
    },
    {
        "id": "IR",
        "name": "Iran",
        "dialCode": "+98",
        "flag": "🇮🇷"
    },
    {
        "id": "IQ",
        "name": "Iraq",
        "dialCode": "+964",
        "flag": "🇮🇶"
    },
    {
        "id": "IE",
        "name": "Ireland",
        "dialCode": "+353",
        "flag": "🇮🇪"
    },
    {
        "id": "IM",
        "name": "Isle of Man",
        "dialCode": "+44",
        "flag": "🇮🇲"
    },
    {
        "id": "IL",
        "name": "Israel",
        "dialCode": "+972",
        "flag": "🇮🇱"
    },
    {
        "id": "IT",
        "name": "Italy",
        "dialCode": "+39",
        "flag": "🇮🇹"
    },
    {
        "id": "JM",
        "name": "Jamaica",
        "dialCode": "+1876",
        "flag": "🇯🇲"
    },
    {
        "id": "JP",
        "name": "Japan",
        "dialCode": "+81",
        "flag": "🇯🇵"
    },
    {
        "id": "JE",
        "name": "Jersey",
        "dialCode": "+44",
        "flag": "🇯🇪"
    },
    {
        "id": "JO",
        "name": "Jordan",
        "dialCode": "+962",
        "flag": "🇯🇴"
    },
    {
        "id": "KZ",
        "name": "Kazakhstan",
        "dialCode": "+7",
        "flag": "🇰🇿"
    },
    {
        "id": "KE",
        "name": "Kenya",
        "dialCode": "+254",
        "flag": "🇰🇪"
    },
    {
        "id": "KI",
        "name": "Kiribati",
        "dialCode": "+686",
        "flag": "🇰🇮"
    },
    {
        "id": "KP",
        "name": "Korea, Democratic People's Republic of Korea",
        "dialCode": "+850",
        "flag": "🇰🇵"
    },
    {
        "id": "KR",
        "name": "Korea, Republic of South Korea",
        "dialCode": "+82",
        "flag": "🇰🇷"
    },
    {
        "id": "XK",
        "name": "Kosovo",
        "dialCode": "+383",
        "flag": "🇽🇰"
    },
    {
        "id": "KW",
        "name": "Kuwait",
        "dialCode": "+965",
        "flag": "🇰🇼"
    },
    {
        "id": "KG",
        "name": "Kyrgyzstan",
        "dialCode": "+996",
        "flag": "🇰🇬"
    },
    {
        "id": "LA",
        "name": "Laos",
        "dialCode": "+856",
        "flag": "🇱🇦"
    },
    {
        "id": "LV",
        "name": "Latvia",
        "dialCode": "+371",
        "flag": "🇱🇻"
    },
    {
        "id": "LB",
        "name": "Lebanon",
        "dialCode": "+961",
        "flag": "🇱🇧"
    },
    {
        "id": "LS",
        "name": "Lesotho",
        "dialCode": "+266",
        "flag": "🇱🇸"
    },
    {
        "id": "LR",
        "name": "Liberia",
        "dialCode": "+231",
        "flag": "🇱🇷"
    },
    {
        "id": "LY",
        "name": "Libyan Arab Jamahiriya",
        "dialCode": "+218",
        "flag": "🇱🇾"
    },
    {
        "id": "LI",
        "name": "Liechtenstein",
        "dialCode": "+423",
        "flag": "🇱🇮"
    },
    {
        "id": "LT",
        "name": "Lithuania",
        "dialCode": "+370",
        "flag": "🇱🇹"
    },
    {
        "id": "LU",
        "name": "Luxembourg",
        "dialCode": "+352",
        "flag": "🇱🇺"
    },
    {
        "id": "MO",
        "name": "Macao",
        "dialCode": "+853",
        "flag": "🇲🇴"
    },
    {
        "id": "MK",
        "name": "Macedonia",
        "dialCode": "+389",
        "flag": "🇲🇰"
    },
    {
        "id": "MG",
        "name": "Madagascar",
        "dialCode": "+261",
        "flag": "🇲🇬"
    },
    {
        "id": "MW",
        "name": "Malawi",
        "dialCode": "+265",
        "flag": "🇲🇼"
    },
    {
        "id": "MY",
        "name": "Malaysia",
        "dialCode": "+60",
        "flag": "🇲🇾"
    },
    {
        "id": "MV",
        "name": "Maldives",
        "dialCode": "+960",
        "flag": "🇲🇻"
    },
    {
        "id": "ML",
        "name": "Mali",
        "dialCode": "+223",
        "flag": "🇲🇱"
    },
    {
        "id": "MT",
        "name": "Malta",
        "dialCode": "+356",
        "flag": "🇲🇹"
    },
    {
        "id": "MH",
        "name": "Marshall Islands",
        "dialCode": "+692",
        "flag": "🇲🇭"
    },
    {
        "id": "MQ",
        "name": "Martinique",
        "dialCode": "+596",
        "flag": "🇲🇶"
    },
    {
        "id": "MR",
        "name": "Mauritania",
        "dialCode": "+222",
        "flag": "🇲🇷"
    },
    {
        "id": "MU",
        "name": "Mauritius",
        "dialCode": "+230",
        "flag": "🇲🇺"
    },
    {
        "id": "YT",
        "name": "Mayotte",
        "dialCode": "+262",
        "flag": "🇾🇹"
    },
    {
        "id": "MX",
        "name": "Mexico",
        "dialCode": "+52",
        "flag": "🇲🇽"
    },
    {
        "id": "FM",
        "name": "Micronesia, Federated States of Micronesia",
        "dialCode": "+691",
        "flag": "🇫🇲"
    },
    {
        "id": "MD",
        "name": "Moldova",
        "dialCode": "+373",
        "flag": "🇲🇩"
    },
    {
        "id": "MC",
        "name": "Monaco",
        "dialCode": "+377",
        "flag": "🇲🇨"
    },
    {
        "id": "MN",
        "name": "Mongolia",
        "dialCode": "+976",
        "flag": "🇲🇳"
    },
    {
        "id": "ME",
        "name": "Montenegro",
        "dialCode": "+382",
        "flag": "🇲🇪"
    },
    {
        "id": "MS",
        "name": "Montserrat",
        "dialCode": "+1664",
        "flag": "🇲🇸"
    },
    {
        "id": "MA",
        "name": "Morocco",
        "dialCode": "+212",
        "flag": "🇲🇦"
    },
    {
        "id": "MZ",
        "name": "Mozambique",
        "dialCode": "+258",
        "flag": "🇲🇿"
    },
    {
        "id": "MM",
        "name": "Myanmar",
        "dialCode": "+95",
        "flag": "🇲🇲"
    },
    {
        "id": "NA",
        "name": "Namibia",
        "dialCode": "+264",
        "flag": "🇳🇦"
    },
    {
        "id": "NR",
        "name": "Nauru",
        "dialCode": "+674",
        "flag": "🇳🇷"
    },
    {
        "id": "NP",
        "name": "Nepal",
        "dialCode": "+977",
        "flag": "🇳🇵"
    },
    {
        "id": "NL",
        "name": "Netherlands",
        "dialCode": "+31",
        "flag": "🇳🇱"
    },
    {
        "id": "AN",
        "name": "Netherlands Antilles",
        "dialCode": "+599",
        "flag": ""
    },
    {
        "id": "NC",
        "name": "New Caledonia",
        "dialCode": "+687",
        "flag": "🇳🇨"
    },
    {
        "id": "NZ",
        "name": "New Zealand",
        "dialCode": "+64",
        "flag": "🇳🇿"
    },
    {
        "id": "NI",
        "name": "Nicaragua",
        "dialCode": "+505",
        "flag": "🇳🇮"
    },
    {
        "id": "NE",
        "name": "Niger",
        "dialCode": "+227",
        "flag": "🇳🇪"
    },
    {
        "id": "NG",
        "name": "Nigeria",
        "dialCode": "+234",
        "flag": "🇳🇬"
    },
    {
        "id": "NU",
        "name": "Niue",
        "dialCode": "+683",
        "flag": "🇳🇺"
    },
    {
        "id": "NF",
        "name": "Norfolk Island",
        "dialCode": "+672",
        "flag": "🇳🇫"
    },
    {
        "id": "MP",
        "name": "Northern Mariana Islands",
        "dialCode": "+1670",
        "flag": "🇲🇵"
    },
    {
        "id": "NO",
        "name": "Norway",
        "dialCode": "+47",
        "flag": "🇳🇴"
    },
    {
        "id": "OM",
        "name": "Oman",
        "dialCode": "+968",
        "flag": "🇴🇲"
    },
    {
        "id": "PK",
        "name": "Pakistan",
        "dialCode": "+92",
        "flag": "🇵🇰"
    },
    {
        "id": "PW",
        "name": "Palau",
        "dialCode": "+680",
        "flag": "🇵🇼"
    },
    {
        "id": "PS",
        "name": "Palestinian Territory, Occupied",
        "dialCode": "+970",
        "flag": "🇵🇸"
    },
    {
        "id": "PA",
        "name": "Panama",
        "dialCode": "+507",
        "flag": "🇵🇦"
    },
    {
        "id": "PG",
        "name": "Papua New Guinea",
        "dialCode": "+675",
        "flag": "🇵🇬"
    },
    {
        "id": "PY",
        "name": "Paraguay",
        "dialCode": "+595",
        "flag": "🇵🇾"
    },
    {
        "id": "PE",
        "name": "Peru",
        "dialCode": "+51",
        "flag": "🇵🇪"
    },
    {
        "id": "PH",
        "name": "Philippines",
        "dialCode": "+63",
        "flag": "🇵🇭"
    },
    {
        "id": "PN",
        "name": "Pitcairn",
        "dialCode": "+64",
        "flag": "🇵🇳"
    },
    {
        "id": "PL",
        "name": "Poland",
        "dialCode": "+48",
        "flag": "🇵🇱"
    },
    {
        "id": "PT",
        "name": "Portugal",
        "dialCode": "+351",
        "flag": "🇵🇹"
    },
    {
        "id": "PR",
        "name": "Puerto Rico",
        "dialCode": "+1939",
        "flag": "🇵🇷"
    },
    {
        "id": "QA",
        "name": "Qatar",
        "dialCode": "+974",
        "flag": "🇶🇦"
    },
    {
        "id": "RO",
        "name": "Romania",
        "dialCode": "+40",
        "flag": "🇷🇴"
    },
    {
        "id": "RU",
        "name": "Russia",
        "dialCode": "+7",
        "flag": "🇷🇺"
    },
    {
        "id": "RW",
        "name": "Rwanda",
        "dialCode": "+250",
        "flag": "🇷🇼"
    },
    {
        "id": "RE",
        "name": "Reunion",
        "dialCode": "+262",
        "flag": "🇷🇪"
    },
    {
        "id": "BL",
        "name": "Saint Barthelemy",
        "dialCode": "+590",
        "flag": "🇧🇱"
    },
    {
        "id": "SH",
        "name": "Saint Helena, Ascension and Tristan Da Cunha",
        "dialCode": "+290",
        "flag": "🇸🇭"
    },
    {
        "id": "KN",
        "name": "Saint Kitts and Nevis",
        "dialCode": "+1869",
        "flag": "🇰🇳"
    },
    {
        "id": "LC",
        "name": "Saint Lucia",
        "dialCode": "+1758",
        "flag": "🇱🇨"
    },
    {
        "id": "MF",
        "name": "Saint Martin",
        "dialCode": "+590",
        "flag": "🇲🇫"
    },
    {
        "id": "PM",
        "name": "Saint Pierre and Miquelon",
        "dialCode": "+508",
        "flag": "🇵🇲"
    },
    {
        "id": "VC",
        "name": "Saint Vincent and the Grenadines",
        "dialCode": "+1784",
        "flag": "🇻🇨"
    },
    {
        "id": "WS",
        "name": "Samoa",
        "dialCode": "+685",
        "flag": "🇼🇸"
    },
    {
        "id": "SM",
        "name": "San Marino",
        "dialCode": "+378",
        "flag": "🇸🇲"
    },
    {
        "id": "ST",
        "name": "Sao Tome and Principe",
        "dialCode": "+239",
        "flag": "🇸🇹"
    },
    {
        "id": "SA",
        "name": "Saudi Arabia",
        "dialCode": "+966",
        "flag": "🇸🇦"
    },
    {
        "id": "SN",
        "name": "Senegal",
        "dialCode": "+221",
        "flag": "🇸🇳"
    },
    {
        "id": "RS",
        "name": "Serbia",
        "dialCode": "+381",
        "flag": "🇷🇸"
    },
    {
        "id": "SC",
        "name": "Seychelles",
        "dialCode": "+248",
        "flag": "🇸🇨"
    },
    {
        "id": "SL",
        "name": "Sierra Leone",
        "dialCode": "+232",
        "flag": "🇸🇱"
    },
    {
        "id": "SG",
        "name": "Singapore",
        "dialCode": "+65",
        "flag": "🇸🇬"
    },
    {
        "id": "SK",
        "name": "Slovakia",
        "dialCode": "+421",
        "flag": "🇸🇰"
    },
    {
        "id": "SI",
        "name": "Slovenia",
        "dialCode": "+386",
        "flag": "🇸🇮"
    },
    {
        "id": "SB",
        "name": "Solomon Islands",
        "dialCode": "+677",
        "flag": "🇸🇧"
    },
    {
        "id": "SO",
        "name": "Somalia",
        "dialCode": "+252",
        "flag": "🇸🇴"
    },
    {
        "id": "ZA",
        "name": "South Africa",
        "dialCode": "+27",
        "flag": "🇿🇦"
    },
    {
        "id": "SS",
        "name": "South Sudan",
        "dialCode": "+211",
        "flag": "🇸🇸"
    },
    {
        "id": "GS",
        "name": "South Georgia and the South Sandwich Islands",
        "dialCode": "+500",
        "flag": "🇬🇸"
    },
    {
        "id": "ES",
        "name": "Spain",
        "dialCode": "+34",
        "flag": "🇪🇸"
    },
    {
        "id": "LK",
        "name": "Sri Lanka",
        "dialCode": "+94",
        "flag": "🇱🇰"
    },
    {
        "id": "SD",
        "name": "Sudan",
        "dialCode": "+249",
        "flag": "🇸🇩"
    },
    {
        "id": "SR",
        "name": "Suriname",
        "dialCode": "+597",
        "flag": "🇸🇷"
    },
    {
        "id": "SJ",
        "name": "Svalbard and Jan Mayen",
        "dialCode": "+47",
        "flag": "🇸🇯"
    },
    {
        "id": "SZ",
        "name": "Swaziland",
        "dialCode": "+268",
        "flag": "🇸🇿"
    },
    {
        "id": "SE",
        "name": "Sweden",
        "dialCode": "+46",
        "flag": "🇸🇪"
    },
    {
        "id": "CH",
        "name": "Switzerland",
        "dialCode": "+41",
        "flag": "🇨🇭"
    },
    {
        "id": "SY",
        "name": "Syrian Arab Republic",
        "dialCode": "+963",
        "flag": "🇸🇾"
    },
    {
        "id": "TW",
        "name": "Taiwan",
        "dialCode": "+886",
        "flag": "🇹🇼"
    },
    {
        "id": "TJ",
        "name": "Tajikistan",
        "dialCode": "+992",
        "flag": "🇹🇯"
    },
    {
        "id": "TZ",
        "name": "Tanzania, United Republic of Tanzania",
        "dialCode": "+255",
        "flag": "🇹🇿"
    },
    {
        "id": "TH",
        "name": "Thailand",
        "dialCode": "+66",
        "flag": "🇹🇭"
    },
    {
        "id": "TL",
        "name": "Timor-Leste",
        "dialCode": "+670",
        "flag": "🇹🇱"
    },
    {
        "id": "TG",
        "name": "Togo",
        "dialCode": "+228",
        "flag": "🇹🇬"
    },
    {
        "id": "TK",
        "name": "Tokelau",
        "dialCode": "+690",
        "flag": "🇹🇰"
    },
    {
        "id": "TO",
        "name": "Tonga",
        "dialCode": "+676",
        "flag": "🇹🇴"
    },
    {
        "id": "TT",
        "name": "Trinidad and Tobago",
        "dialCode": "+1868",
        "flag": "🇹🇹"
    },
    {
        "id": "TN",
        "name": "Tunisia",
        "dialCode": "+216",
        "flag": "🇹🇳"
    },
    {
        "id": "TR",
        "name": "Turkey",
        "dialCode": "+90",
        "flag": "🇹🇷"
    },
    {
        "id": "TM",
        "name": "Turkmenistan",
        "dialCode": "+993",
        "flag": "🇹🇲"
    },
    {
        "id": "TC",
        "name": "Turks and Caicos Islands",
        "dialCode": "+1649",
        "flag": "🇹🇨"
    },
    {
        "id": "TV",
        "name": "Tuvalu",
        "dialCode": "+688",
        "flag": "🇹🇻"
    },
    {
        "id": "UG",
        "name": "Uganda",
        "dialCode": "+256",
        "flag": "🇺🇬"
    },
    {
        "id": "UA",
        "name": "Ukraine",
        "dialCode": "+380",
        "flag": "🇺🇦"
    },
    {
        "id": "AE",
        "name": "United Arab Emirates",
        "dialCode": "+971",
        "flag": "🇦🇪"
    },
    {
        "id": "GB",
        "name": "United Kingdom",
        "dialCode": "+44",
        "flag": "🇬🇧"
    },
    {
        "id": "US",
        "name": "United States",
        "dialCode": "+1",
        "areaCodes": ['201', '202', '203', '205', '206', '207', '208', '209', '210', '212', '213', '214', '215', '216', '217', '218', '219', '220', '223', '224', '225', '227', '228', '229', '231', '234', '239', '240', '248', '251', '252', '253', '254', '256', '260', '262', '267', '269', '270', '272', '274', '276', '279', '281', '301', '302', '303', '304', '305', '307', '308', '309', '310', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '323', '325', '330', '331', '332', '334', '336', '337', '339', '346', '347', '351', '352', '360', '361', '364', '380', '385', '386', '401', '402', '404', '405', '406', '407', '408', '409', '410', '412', '413', '414', '415', '417', '419', '423', '424', '425', '430', '432', '434', '435', '440', '442', '443', '445', '447', '448', '458', '463', '469', '470', '475', '478', '479', '480', '484', '501', '502', '503', '504', '505', '507', '508', '509', '510', '512', '513', '515', '516', '517', '518', '520', '530', '531', '534', '539', '540', '541', '551', '559', '561', '562', '563', '564', '567', '570', '571', '573', '574', '575', '580', '585', '586', '601', '602', '603', '605', '606', '607', '608', '609', '610', '612', '614', '615', '616', '617', '618', '619', '620', '623', '626', '628', '629', '630', '631', '636', '641', '646', '650', '651', '657', '659', '660', '661', '662', '667', '669', '678', '681', '682', '689', '701', '702', '703', '704', '706', '707', '708', '712', '713', '714', '715', '716', '717', '718', '719', '720', '724', '725', '727', '731', '732', '734', '737', '740', '743', '747', '754', '757', '760', '762', '763', '765', '769', '770', '772', '773', '774', '775', '779', '781', '785', '786', '801', '802', '803', '804', '805', '806', '808', '810', '812', '813', '814', '815', '816', '817', '818', '828', '830', '831', '832', '843', '845', '847', '848', '850', '854', '856', '857', '858', '859', '860', '862', '863', '864', '865', '870', '872', '878', '901', '903', '904', '906', '907', '908', '909', '910', '912', '913', '914', '915', '916', '917', '918', '919', '920', '925', '928', '929', '930', '931', '934', '936', '937', '938', '940', '941', '947', '949', '951', '952', '954', '956', '959', '970', '971', '972', '973', '975', '978', '979', '980', '984', '985', '989'],
        "flag": "🇺🇸"
    },
    {
        "id": "UY",
        "name": "Uruguay",
        "dialCode": "+598",
        "flag": "🇺🇾"
    },
    {
        "id": "UZ",
        "name": "Uzbekistan",
        "dialCode": "+998",
        "flag": "🇺🇿"
    },
    {
        "id": "VU",
        "name": "Vanuatu",
        "dialCode": "+678",
        "flag": "🇻🇺"
    },
    {
        "id": "VE",
        "name": "Venezuela",
        "dialCode": "+58",
        "flag": "🇻🇪"
    },
    {
        "id": "VN",
        "name": "Vietnam",
        "dialCode": "+84",
        "flag": "🇻🇳"
    },
    {
        "id": "VG",
        "name": "Virgin Islands, British",
        "dialCode": "+1284",
        "flag": "🇻🇬"
    },
    {
        "id": "VI",
        "name": "Virgin Islands, U.S.",
        "dialCode": "+1340",
        "flag": "🇻🇮"
    },
    {
        "id": "WF",
        "name": "Wallis and Futuna",
        "dialCode": "+681",
        "flag": "🇼🇫"
    },
    {
        "id": "YE",
        "name": "Yemen",
        "dialCode": "+967",
        "flag": "🇾🇪"
    },
    {
        "id": "ZM",
        "name": "Zambia",
        "dialCode": "+260",
        "flag": "🇿🇲"
    },
    {
        "id": "ZW",
        "name": "Zimbabwe",
        "dialCode": "+263",
        "flag": "🇿🇼"
    }
]