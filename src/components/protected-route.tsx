
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    // const user = useUser();
    // const location = useLocation();
    // if (!user.data) {
    //   return (
    //     <Navigate
    //       to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
    //       replace
    //     />
    //   );
    // }

    return children;
};

export default ProtectedRoute