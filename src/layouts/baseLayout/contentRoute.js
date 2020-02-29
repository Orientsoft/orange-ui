import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Home from '../../pages/home';
import NoMatch from "../../pages/noMatch";

export default class ContentRoute extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.menuConfig.length !== this.props.menuConfig.length){
            return true;
        }
        return false
    }
    renderContentRoute = menuArray => {
        let routeArray = [];
        menuArray.forEach(value => {
            const { children, path, component } = value;
            if (children) {
                routeArray = routeArray.concat(this.renderContentRoute(children));
            } else {
                const LoadableComponenent = Loadable({
                    loader: () => import(`../../pages/${component}`),
                    loading() {
                        return <div>Loading...</div>;
                    }
                });
                routeArray.push(
                    <Route key={path} path={path} exact component={LoadableComponenent} />
                );
            }
        });
        return routeArray;
    };
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                {this.renderContentRoute(this.props.menuConfig)}
                <Route component={NoMatch} />
            </Switch>
        );
    }
}
