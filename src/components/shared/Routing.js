// export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
//     <Route
//       {...rest}
//       render={props => {
//         if (auth.isAuthenticated && auth.user.isConfirmed) {
//           return <Component {...props} />
//         }
//         if (auth.isAuthenticated && !auth.user.isConfirmed) {
//           return (
//             <Redirect
//               to={{
//                 pathname: "/confirmation",
//                 state: { from: props.location }
//               }}
//             />
//           )
//         } else {
//           return (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: props.location }
//               }}
//             />
//           )
//         }
//       }}
//     />
//   )
