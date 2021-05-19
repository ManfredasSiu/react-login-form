# react-login-form

Ši github repozitorija skirta bakalaurinio darbo klientinės ir serverinės dalių talpyklai.

* Klientinė dalis realizuota aplanke "client"
* Serverinė dalis realizuota aplanke "server"

Norint pasileisti tiek serverinę tiek klientinę dalis reikia įgyvendinti šią komandas abiejuose direktorijose:
* npm start

Prieš atliekant šios programos paleidimą reikia savo kompiuteryje turėti įdietus React įrankius, geriausia tiek serverinę tiek kleintinę dalis atsidaryti su Visual Studio Code programa: https://code.visualstudio.com/download

**Verta pastebėti.** Dėl saugumo sumetimų serverio "MailController.tsx" faile nėra elektroninio pašto slaptažodžio - todėl pasileidus programą ir norint nustatyti slaptažodį iš naujo - šis funkcionalumas neveiks.

**Verta pastebėti.** Programos serverinė dalis turi turėti prieigą prie MySQL duomenų bazės pavadinimu "userdb", kurioje būtų lentelė users su 2 string tipo stulpeliais. Duomenų bazės įkelti į github repositoriją nepavyko, todėl norint išbandyti prisijungimą ir registraciją - gali tekti ją susidiegti. 

Siekiant parodyti sistemos funkcionalumą github repozitorijoje pridėti šie failai:
* Registracija.mp4 - parodantis registracijos procesą
* Prisijungimas.mp4 - parodantis prisijungimo procesą
* SlaptažodžioNustatymasIšNaujo.mp4 - parodo slaptažodžio nustatymo iš naujo procesą ir prisijungimą po slaptažodžio pakeitimo
* Pagalbinis.png - pagalbinio teksto nuotrauka
