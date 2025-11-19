import LoginForm from "../components/forms/LoginForm";
import useRequireAuth from '../hooks/useRequireAuth';

export default function LoginPage(){
    const user = useRequireAuth();
    return(
        <div>
            <h2>Login Form</h2>
            <LoginForm></LoginForm>
        </div>
    );
}