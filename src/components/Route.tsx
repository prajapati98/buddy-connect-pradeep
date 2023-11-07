// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Login from "./Login";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import Dashboard from "./Dashboard";

// interface AppLayoutProps {
//   children: React.ReactNode;
// }

// const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
//   return (
//     <>
//       <Sidebar />
//       {children}
//       <Footer />
//     </>
//   );
// };

// const LoginLayout: React.FC<AppLayoutProps> = ({ children }) => {
//   return <>{children}</>;
// };

// const RouteApp = () => (
//   <Router>
//     <Switch>
//       <Route path="/" exact>
//         <AppLayout>
//           <Switch>
//             <Route path="">
//               <LoginLayout>
//                 <Login />
//               </LoginLayout>
//             </Route>
//           </Switch>
//         </AppLayout>
//       </Route>
//       <Route path="/dashboard">
//         <Dashboard />
//       </Route>
//       {/* Add more routes for other pages here */}
//     </Switch>
//   </Router>
// );

// export default RouteApp;

import React from "react";

export default function Route() {
  return <div>Route</div>;
}
