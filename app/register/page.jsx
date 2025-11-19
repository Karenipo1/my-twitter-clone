import RegisterForm from "../components/forms/RegisterForm";
import useRequireAuth from '../hooks/useRequireAuth';

export default function RegisterPage(){
    const user = useRequireAuth();
    return(
        <div>
            <h2>Register Form</h2>
            <RegisterForm></RegisterForm>
        </div>
    );
}