import { createStore } from "redux";
import { Animated } from "react-native";
import themes from "~/styles";

export interface IFilters {
    food: boolean;
    documentation: boolean;
    education: boolean;
    shelter: boolean;
    health: boolean;
    clothes: boolean;
    job: boolean;
    acessibility: boolean;
    nursery: boolean;
}

export interface IPosition {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export interface ITheme {
    primary200: string;
    primary300: string;
    primary400: string;
    primary500: string;
    primary600: string;
    primary700: string;
    primary800: string;
    primary: string;
    secondary: string;
    primaryLight: string;
    primaryDark: string;
    background: string;
    surface: string;
    fontColor: string;
}
export interface OfferDTO {
    position: IPosition;
    filter: IFilters;
    searchDistanceRadius: number;
}
export interface IMarker {
    position?: IPosition;
    latitude: number;
    longitude: number;
    objectId?: string;
    local?: Object;
    food?: Boolean;
    education?: Boolean;
    shelter?: Boolean;
    health?: Boolean;
    clothes?: Boolean;
    job?: Boolean;
    nursery?: Boolean;
    offerResponsable?: string;
    developmentArea?: string;
    name: string;
    targetGroup?: string;
    schedule?: string;
    description: {
        portuguese: string;
        spanish: string;
        english: string;
    };
    accessibility?: Boolean;
    recreation?: Boolean;
    distance: number;
}
export interface IState {
    theme: ITheme;
    drawerActive: string;
    user: {
        gender: string;
        occupation: string;
        name: string;
        lastName: string;
        location: {
            latitude: number;
            longitude: number;
            latitudeDelta: number;
            longitudeDelta: number;
        };
        birthYear: Date;
        email: string;
        numero: null;
        document: string;
        docType: string;
        needs: string[];
    };
    markers: [];
    filterActive: {
        food: false;
        documentation: false;
        education: false;
        shelter: false;
        health: false;
        clothes: false;
        job: false;
        acessibility: false;
        nursery: false;
    };
    filterTabActive: false;
    filterTabLoading: false;
    editProfileActive: false;
    isAddMemberDialogOpen: false;
    filterTabAnim: Animated.Value;
    isMarkerSelected: false;
    markerSelected: {
        name: "";
        description: "";
        distance: 0;
    };
    markerCardAnimNum: Animated.Value;
    isInitialRegion: false;
}
const INITIAL_STATE: IState = {
    theme: themes.light,
    drawerActive: "Mi Localización",
    user: {
        gender: "Masculino",
        occupation: "Programador",
        name: "Guilherme",
        lastName: "Salvo",
        location: {
            latitude: -10,
            longitude: -40,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        },
        birthYear: new Date(),
        email: "ggelmisalvo@gmail.com",
        numero: null,
        document: "",
        docType: "",
        needs: [],
    },
    markers: [],
    filterActive: {
        food: false,
        documentation: false,
        education: false,
        shelter: false,
        health: false,
        clothes: false,
        job: false,
        acessibility: false,
        nursery: false,
    },
    filterTabActive: false,
    filterTabLoading: false,
    editProfileActive: false,
    isAddMemberDialogOpen: false,
    filterTabAnim: new Animated.Value(0),
    isMarkerSelected: false,
    markerSelected: {
        name: "",
        description: "",
        distance: 0,
    },
    markerCardAnimNum: new Animated.Value(0),
    isInitialRegion: false,
};

function markerCardShowAnimFunc(markerCardAnimNum: any) {
    Animated.spring(markerCardAnimNum, {
        toValue: 1000,
    }).start();
    //console.log('abriu');
}

function markerCardHideAnimFunc(markerCardAnimNum: any) {
    Animated.spring(markerCardAnimNum, {
        toValue: 0,
    }).start();
    //console.log('fecho');
}
interface action extends IState {
    type:
        | "DRAWER_ACTIVE"
        | "UPDATE_LOCATION"
        | "ADD_MARKERS"
        | "FILTER_ACTIVE"
        | "FILTERTAB_ACTIVE"
        | "SET_FILTERTAB_ACTIVE"
        | "FILTER_LOADING"
        | "FILTERTAB_ANIM"
        | "SELECT_MARKER"
        | "DESELECT_MARKER"
        | "INITIAL_REGION"
        | "SET_USER_INFO";
}
function reducer(state = INITIAL_STATE, action: any): any {
    switch (action.type) {
        case "DRAWER_ACTIVE":
            return { ...state, drawerActive: action.title };
        case "UPDATE_LOCATION":
            //console.log('ASODASD'+action.latitude)
            return {
                ...state,
                user: {
                    ...state.user,
                    location: {
                        ...state.user.location,
                        latitude: action.latitude,
                        longitude: action.longitude,
                    },
                },
            };
        case "ADD_MARKERS":
            return { ...state, markers: action.markers };
        case "FILTER_ACTIVE":
            const filterA = action.filter;
            let newState = state;
            newState.filterActive[filterA] = !state.filterActive[filterA];
            return newState;
        case "FILTERTAB_ACTIVE":
            return { ...state, filterTabActive: !state.filterTabActive };
        case "SET_FILTERTAB_ACTIVE":
            return { ...state, filterTabActive: action.filterTabActive };
        case "FILTER_LOADING":
            return { ...state, filterTabLoading: !state.filterTabLoading };
        case "FILTERTAB_ANIM":
            return { ...state, filterTabAnim: action.filterTabAnimNum };
        case "SELECT_MARKER":
            //markerCardShowAnimFunc(state.markerCardAnimNum);
            return {
                ...state,
                markerSelected: {
                    ...state.markerSelected,
                    name: action.name,
                    description: action.description,
                    distance: action.distance,
                },
                isMarkerSelected: true,
            };
        case "DESELECT_MARKER":
            //markerCardHideAnimFunc(state.markerCardAnimNum);
            return {
                ...state,
                isMarkerSelected: false,
            };
        case "INITIAL_REGION":
            return {
                ...state,
                isInitialRegion: true,
            };
        case "SET_USER_INFO":
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
}

const store = createStore(reducer);
export const setUserInfo = (user: IState["user"]) => {
    store.dispatch({ type: "SET_USER_INFO", user });
};
export default store;
