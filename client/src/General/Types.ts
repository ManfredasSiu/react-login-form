

let PhotoCodes = new Array(5);

PhotoCodes = [
    {key: "15Oo", value: process.env.PUBLIC_URL + '/PasswordCastle.jpg'},
    {key: "14Nn", value: process.env.PUBLIC_URL + '/PasswordFlower.jpg'},
    {key: "13Mm", value: process.env.PUBLIC_URL + '/PasswordSea.jpg'},
    {key: "12Aa", value: process.env.PUBLIC_URL + '/PasswordCandle.jpg'},
    {key: "11Bb", value: process.env.PUBLIC_URL + '/PasswordAngel.jpg'},
    {key: "10Cc", value: process.env.PUBLIC_URL + '/PasswordDog.jpg'},
    {key: "09Dd", value: process.env.PUBLIC_URL + '/PasswordDuck.jpg'},
    {key: "08Ee", value: process.env.PUBLIC_URL + '/PasswordPerson.jpg'},
    {key: "07Ff", value: process.env.PUBLIC_URL + '/PasswordBerries.jpg'},
    {key: "06Gg", value: process.env.PUBLIC_URL + '/PasswordBooks.jpg'},
    {key: "05Hh", value: process.env.PUBLIC_URL + '/PasswordLake.jpg'},
    {key: "04Ii", value: process.env.PUBLIC_URL + '/PasswordLeaves.jpg'},
    {key: "03Jj", value: process.env.PUBLIC_URL + '/PasswordSnow.jpg'},
    {key: "02Kk", value: process.env.PUBLIC_URL + '/PasswordSunset.jpg'},
    {key: "01Ll", value: process.env.PUBLIC_URL + '/PasswordTree.jpg'},
    
]

export const ShufflePhotos = () => {
    var currentIndex = PhotoCodes.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = PhotoCodes[currentIndex];
    PhotoCodes[currentIndex] = PhotoCodes[randomIndex];
    PhotoCodes[randomIndex] = temporaryValue;
    }
}

export default PhotoCodes;