import axios from 'axios'

// const root = "http://localhost:3001"
const root = "https://tranquil-reaches-12289.herokuapp.com"

export const register = (newUser) => {
    return axios
        .post(`${root}/register`, newUser)
        .then((response) => {
            console.log("Registered");
        });
};

export const login = (loginUser) => {
    return axios
        .post(`${root}/login`, loginUser)
        .then(response => {
            console.log(response.data.accessToken)
            localStorage.setItem('auth-token', response.data.accessToken)
            localStorage.setItem('refresh-token', response.data.refreshToken)
            if(response.data.accessToken === null) {
                axios
                .post(`${root}/refresh`)
                .then(response=> 
                    localStorage.setItem('auth-token', response.data.accessToken))
            }
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
};

//request interceptor to add the auth token header to requests
// might not need that one since we're already using another way of applying the header
/* axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["auth-token"] = accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;
        let refreshToken = localStorage.getItem("refresh-token"); if (
            refreshToken &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            return axios
                .post(`${root}/auth/refresh_token`, { refreshToken: refreshToken })
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem("auth-token", res.data.accessToken);
                        console.log("Access token refreshed!");
                        return axios(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
); */