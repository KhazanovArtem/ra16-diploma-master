import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export interface NavigationLinkType {
    name: string,
    url: string,
    isActive: boolean,

}

export interface NavigationLinksState {
    headerNavigationLinks: NavigationLinkType[];
    footerNavigationLinks: NavigationLinkType[];
}

const initialState: NavigationLinksState = {
    headerNavigationLinks : [
        {name: "Главная", url: "/", isActive: true},
        {name: "О магазине", url: "about", isActive: false},
        {name: "Каталог", url: "catalog", isActive: false},
        {name: "Контакты", url: "contacts", isActive: false},
    ],
    footerNavigationLinks : [
        {name: "О магазине", url: "about", isActive: false},
        {name: "Каталог", url: "catalog", isActive: false},
        {name: "Контакты", url: "contacts", isActive: false},
    ]
}

export const navigationLinksSlice = createSlice({
    name: 'navigationLinks',
    initialState,
    reducers: {
        setActiveNavigationLink: (state, action: PayloadAction<string>) => {
            state.headerNavigationLinks = state.headerNavigationLinks.map(item => {
                if (item.name === action.payload) {
                    item.isActive = true;
                    } else {
                    item.isActive = false;
                }
                return item;
            });
            state.footerNavigationLinks = state.footerNavigationLinks.map(item => {
                if (item.name === action.payload) {
                    item.isActive = true;
                    } else {
                    item.isActive = false;
                }
                return item;
            });
        },
        setHeaderNavigationLinks: (state, action: PayloadAction<NavigationLinkType[]>) => {
            state.headerNavigationLinks = action.payload;
        },
        setFooterNavigationLinks: (state, action: PayloadAction<NavigationLinkType[]>) => {
            state.footerNavigationLinks = action.payload;
        },
    }
});

export const {
	setHeaderNavigationLinks,
	setFooterNavigationLinks,
	setActiveNavigationLink,
} = navigationLinksSlice.actions;
export default navigationLinksSlice.reducer;

export const headerNavigationLinks = (state: RootState) => state.navigationLinks.headerNavigationLinks;
export const footerNavigationLinks = (state: RootState) => state.navigationLinks.footerNavigationLinks;