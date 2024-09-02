export type SignUpDto = {
    email: string;
    name: string;
    password: string;
    passwordConfirm: string;
    house_number: number;
    street: string;
    city: string;
    zip_code: number;
    country: string;
    firstname: string;
    lastname: string;
    avatar: string | null;
}