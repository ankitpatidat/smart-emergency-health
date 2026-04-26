const backendDomain = "http://localhost:5000/api";

const SummaryApi = {
    register: {
        url: `${backendDomain}/auth/register`,
        method: "post"
    },
    login: {
        url: `${backendDomain}/auth/login`,
        method: "post"
    },
    getProfile: {
        url: `${backendDomain}/profile`,
        method: "get"
    },
    saveProfile: {
        url: `${backendDomain}/profile`,
        method: "post"
    },
    scanProfile: {
        url: `${backendDomain}/profile/scan`,
        method: "get"
    },
    medicines: {
        url: `${backendDomain}/medicines`,
        method: "post" // get aur put ke liye bhi yahi base URL use karenge
    }
};

export default SummaryApi;