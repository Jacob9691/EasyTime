import axios from "axios";

// Opretter en instans af axios med en base URL til API'et
const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

// Interceptor til at tilføje autorisationstoken til hovederne på alle anmodninger
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN'); // Henter adgangstoken fra localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Tilføjer token til autorisationshovedet
    }
    return config;
});

// Interceptor til at håndtere fejl i svar fra serveren
axiosClient.interceptors.response.use((response) => {
    return response; // Returnerer svarobjektet direkte, hvis der ikke er nogen fejl
}, (error) => {
    try {
        const { response } = error; // Henter svarobjektet fra fejlmeddelelsen

        if (response && response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN'); // Fjerner adgangstoken fra localStorage ved uautoriseret fejl
        }
    } catch (ex) {
        console.error(ex); // Håndterer eventuelle fejl i forsøget på at behandle fejlen
    }

    throw error; // Kaster fejlen videre for yderligere håndtering
});

export default axiosClient; // Eksporterer axiosClient som standard
