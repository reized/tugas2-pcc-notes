import { useAuthContext } from "./authProvider";

const useAuth = () => {
    const { accessToken, login, logout, refreshAccessToken } = useAuthContext();

    return {
        accessToken,
        login,
        logout,
        refreshAccessToken,
        isAuthenticated: !!accessToken,
    };
};

export default useAuth;
