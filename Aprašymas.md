# Įgyvendinto sprendimo diegimo aprašymas ir rekomendacijos

Ši github repozitorija skirta bakalaurinio darbo klientinės ir serverinės dalių talpyklai.

* Klientinė dalis realizuota aplanke "client"
* Serverinė dalis realizuota aplanke "server"

Norint pasileisti tiek serverinę tiek klientinę dalis reikia:
* Parsisiųsti node-js modulį ir jį suinstaliuoti iš https://nodejs.org/en/download/
* Parsisiųsti Visual Studio Code ir suinstaliuoti iš https://code.visualstudio.com/download
* Norint pažiūrėti programos dizainą - duomenų bazės nereikia --Kaip įdiegti duomenų bazę žiūrėkite žemiau-- 
* Atsidaryti server ir client aplankus skirtinguose Visual Studio Code languose
* Abiejų langų terminaluose įgyvendinti komandą "npm start"
* Jei viskas gerai - klientinė dalis atsidarys numatytoje naršyklėje, o serveris konsolėje parašys "Listening to port 5000"

**Verta pastebėti.** Dėl saugumo sumetimų serverio "MailController.tsx" faile nėra elektroninio pašto slaptažodžio - todėl pasileidus programą ir norint nustatyti slaptažodį iš naujo - šis funkcionalumas neveiks. Žiūrėti "SlaptažodžioNustatymasIšNaujo.mp4"

**Verta pastebėti.** Programos serverinė dalis turi turėti prieigą prie MySQL duomenų bazės pavadinimu "userdb", kurioje būtų lentelė "users" su 2 string tipo stulpeliais. Duomenų bazės įkelti į github repositoriją nepavyko, todėl norint išbandyti prisijungimą ir registraciją - gali tekti ją susidiegti. 

Duomenų bazė kompiuteryje veiks visada, kada tik įsijungs kompiuteris, norint pašalinti - ištrinkite žemiau nurodytą duomenų bazės prisijungimą. Kaip įdiegti duomenų bazę:
* Parsisiūsti MySQL dashboard programą iš repozitorijoje įkelto "mysql-installer-web-community-8.0.23.0" failo
* Suinstaliuoti ir atidaryti
* Prie MySQL connections spausti + simbolį
* Sukurti duomenų bazę "AuthenticationDB" su port 3306
* Atsidarius duomenų bazei sukurti schemą su pavadinimu "userdb"
* Skiltyje "Tables" spausti dešinį palės klavišą ir sukurti lentelę pavadinimu "users"
* Apačioje pridėti lentelės stulpelius pavadinimais "Name" ir "Password" 
* Name duomenų tipas "VARCHAR(45)" PK ir NN langeliai pasirinkti
* Password duomenų tipas "CHAR(76)" NN langelis pasirinktas

Siekiant parodyti sistemos funkcionalumą nepaleidžiant programos - github repozitorijoje pridėti šie failai:
* Registracija.mp4 - parodantis registracijos procesą
* Prisijungimas.mp4 - parodantis prisijungimo procesą
* SlaptažodžioNustatymasIšNaujo.mp4 - parodo slaptažodžio nustatymo iš naujo procesą ir prisijungimą po slaptažodžio pakeitimo
* BusenosMatomumas.mp4 - parodo būsenos matomumą registracijos metu
* Pagalbinis.png - pagalbinio teksto nuotrauka
