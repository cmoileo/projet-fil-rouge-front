const BaseUrl = 'http://localhost:3000';

export const ApiUrl = {
    Auth: {
        Signin: BaseUrl + '/auth/employee/login',
        Signup: BaseUrl + '/auth/agency/register',
        AddEmployee: BaseUrl + '/auth/agency/add-employee',
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