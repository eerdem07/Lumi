import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.user.user);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  if (user === null && !checked) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
