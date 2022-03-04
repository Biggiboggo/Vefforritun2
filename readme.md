```bash
createdb vef2-2022-v2
createdb vef2-2022-v2-test
# setja upp .env & .env.test með tengingu í gagnagrunna
npm install
npm run test
npm run setup
npm start # eða `npm run dev`
```

Tveir accounts:
# admin
Notandanafn : admin 
Lykilorð : 123
# user
Notandanafn : biggi 
Lykilorð : 123

/users/ fæst með því að ýta á Notendur á Index
/users/:id Skrifar bara id-ið fyrir aftan manually
/users/register fæst með því að fara í Innskráning og ýta á Búa til aðgang
/users/login fæst með því að ýta á Innskráning
/users/me fæst með því að ýta á Ég
/events/ fæst með því að ýta á Viðburðir
/events/:id fæst með því að ýta á uppfæra viðburð eða skrifa inn id-ið
/events/:id/register engin sérstök síða notaði bara það sem var nú þegar til með slug í verkefni 2, hægt að skrá sig á viðburð með því að opna viðburðinn sjálfann

Þetta er mess jesús kristur maður
