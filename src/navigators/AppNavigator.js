import React from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ExtraSignUpData from "../components/ExtraSignUpData";
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers, NavigationActions, StackNavigator} from "react-navigation";


export const AppNavigator = StackNavigator(
    {
        Login: {screen: Login},
        Signup: {screen: Signup},
        ExtraSignUpData: {screen: ExtraSignUpData},
    },
    {
        //drawerOpenRoute: 'DrawerOpen',
        //drawerCloseRoute: 'DrawerClose',
        //drawerToggleRoute: 'DrawerToggle',
        headerMode: 'none',
        //drawerWidth: 300,
        //drawerPosition: 'left',
        //contentComponent: props => <SideBar {...props} />
    }
);

class AppNavigation extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const {dispatch, nav} = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        });

        return (
            <AppNavigator navigation={navigation}/>
        );
    }
}


const mapStateToProps = state => ({
    nav: state.nav,
    app: state.app,
});

export default connect(mapStateToProps)(AppNavigation);
