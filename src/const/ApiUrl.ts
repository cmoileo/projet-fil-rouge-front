const BaseUrl = 'http://localhost:3000';

export const ApiUrl = {
    Auth: {
        Signin: BaseUrl + '/auth/employee/login',
        Signup: BaseUrl + '/auth/agency/register',
    },
    Folder: {
        Get: BaseUrl + '/folders/get',
        Create: BaseUrl + '/folders',
        Update: BaseUrl + '/folders',
        Delete: BaseUrl + '/folders',
    },
}