const devUrl = 'http://localhost:4000/'


export const BASE_URL = devUrl;

export const AppRoutes = {
    login: BASE_URL + 'auth/login',
    register: BASE_URL + 'auth/register',
    myInfo: BASE_URL + 'user/myInfo',
    getCourse: BASE_URL + 'courses',
    addCourse: BASE_URL + 'courses'
}