import RnEcommerceSimiconnector from 'rn-ecommerce-simiconnector';

export default {
    splash: {
        active: false,
        route_name: 'Splash',
        component: require('../src/screen/splash/pages/index').default,
    },
    Home: {
        active: true,
        route_name: 'Home',
        component: RnEcommerceSimiconnector,
    },
};
