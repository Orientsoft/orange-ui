import React from "react";
import { Route, Redirect } from "react-router-dom";

import store from "../store/store";

export default class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    console.log("rest", rest);
    return (
      <Route
        {...rest}
        render={props => {
          const { appStatus } = store.getState();

          if (!appStatus.isAuth) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            );
          }
          return <Component {...props} />;
        }}
      />
    );
  }
}

// export default function PrivateRoute({ component: Component, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={props =>{
//                 const { appStatus } = store.getState();
//                 console.log('appStatus', appStatus);
//                 if (appStatus.isAuth) {
//                     return <Component {...props} />;
//                 }
//                 return <Redirect
//                 to={{
//                     pathname: "/login",
//                     state: { from: props.location }
//                 }}
//             />
//             }}
//         />
//     );
// }
