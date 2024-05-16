const BaseUrl = 'http://localhost:3000';

export const ApiUrl = {
    Auth: {
        Signin: BaseUrl + '/auth/employee/login',
        Signup: BaseUrl + '/auth/agency/register',
        AddEmployee: BaseUrl + '/auth/agency/add-employee',
        RegisterEmployee: BaseUrl + '/auth/employee/register',
        GetEmployee: BaseUrl + '/account/get-users',
        AddAvatar: BaseUrl + '/auth/employee/add-avatar',
    },
    Folder: {
        Get: BaseUrl + '/folders/get',
        Create: BaseUrl + '/folders',
        Update: BaseUrl + '/folders',
        Delete: BaseUrl + '/folders/delete',
    },
    Projects: {
        Get: BaseUrl + '/projects/get',
        Create: BaseUrl + '/projects/create',
        Update: BaseUrl + '/projects/update',
        Delete: BaseUrl + '/projects/delete',
    },
    Jobs: {
        Get: BaseUrl + '/jobs',
        Create: BaseUrl + '/jobs/create',
        Update: BaseUrl + '/jobs/update',
        Delete: BaseUrl + '/jobs/delete',
        RemoveEmployee: BaseUrl + '/jobs/employee/remove',
        AddEmployee: BaseUrl + '/jobs/employee/assign',
    },
    Roles: {
        Assign: BaseUrl + '/jobs/role/assign',
    },
    Account: {
        GetByUserId: BaseUrl + '/account/get-user',
        Update: BaseUrl + '/account/update',
    }
}