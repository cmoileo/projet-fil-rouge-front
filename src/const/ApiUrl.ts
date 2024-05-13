const BaseUrl = 'https://fil-rouge-api.onrender.com';

export const ApiUrl = {
    Auth: {
        Signin: BaseUrl + '/auth/employee/login',
        Signup: BaseUrl + '/auth/agency/register',
        AddEmployee: BaseUrl + '/auth/agency/add-employee',
        RegisterEmployee: BaseUrl + '/auth/employee/register',
        GetEmployee: BaseUrl + '/account/get-users',
    },
    Folder: {
        Get: BaseUrl + '/folders/get',
        Create: BaseUrl + '/folders',
        Update: BaseUrl + '/folders',
        Delete: BaseUrl + '/folders',
    },
    Projects: {
        Get: BaseUrl + '/projects/get',
        Create: BaseUrl + '/projects/create',
        Update: BaseUrl + '/projects/update',
        Delete: BaseUrl + '/projects/delete',
    }
}