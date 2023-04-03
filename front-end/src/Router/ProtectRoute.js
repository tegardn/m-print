import {Navigate, Outlet} from "react-router-dom";

function Auth() {
    const user = localStorage.getItem("Authorization");

    if (user) {
        return true; 
    } else {
        return false;
    }
}

export default function ProtectRoute(props) {
    const x = Auth();
    return x ? <Outlet /> : <Navigate to="/login" />
}
