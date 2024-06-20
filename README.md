# EasyTime
Tidsregistrering projekt

Komponenter:
- DefaultLayout: Layout-komponent, der indeholder navigationsmenu og renderes som standard.
- Calendar: Viser en kalender med events hentet fra API. Bruger react-big-calendar og moment til at håndtere kalenderdata og visning.
- Profile: Tillader brugeren at opdatere deres profilinformation som navn, email, adresse og telefonnummer.
- Company: Viser virksomhedsinformation og tillader redigering.
- Users: Viser en liste over brugere tilknyttet virksomheden.
- GuestLayout: Layout-komponent til gæster uden login, f.eks. login- og registreringssider.
- Login, Signup, CompanyRegister: Sider til login, oprettelse af bruger og registrering af virksomhed.
- NotFound: Side der vises ved forsøg på at tilgå en ikke-eksisterende rute.

Routing:
- Bruger createBrowserRouter fra react-router-dom til at definere routing-strukturen.
- Definerer ruter for forskellige sider og layouter, inklusive beskyttede sider bag login.

Datahåndtering:
- Bruger axiosClient til at kommunikere med min API-backend for at hente og opdatere data som events, brugerprofiler og virksomhedsoplysninger.
- Håndterer formularer til oprettelse og opdatering af brugerprofiler, virksomhedsoplysninger og events.

Tilstandshåndtering:
- Bruger useState og useEffect hooks til at administrere komponenttilstand, f.eks. for brugeroplysninger, events og fejlbeskeder.
- useStateContext fra ContextProvider bruges til global tilstandshåndtering af brugeroplysninger og token.

