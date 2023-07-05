
import { Navigate, Outlet} from 'react-router-dom';
export default function RouteWrapper({ isPrivate=false, element:Element, ...rest }) {
 const signed=true;
  if (!signed && isPrivate) {
    return <Navigate to="/"/>;
  }
  if (signed && !isPrivate) {
    return <Outlet />;  
  }
  return <div><Outlet /></div>// <-- nested routes render here
}
