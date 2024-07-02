import { NavigationLinkType } from "../redux/reducers/navigationLinksSlice"
import { useAppDispatch } from "../redux/store"
import { setActiveNavigationLink } from "../redux/reducers/navigationLinksSlice";
import { Link } from "react-router-dom";

export const NavigationLink =  ({name, url, isActive} : NavigationLinkType)  => {
    const dispatch = useAppDispatch();
    const navLinkClassName = isActive ? 'nav-item active' : 'nav-item';

    function navigationLinkClickEventHandler() {
        dispatch(setActiveNavigationLink(name));
    }

    return (
        <li className={navLinkClassName}>
            <Link className="nav-link" to={url} onClick={navigationLinkClickEventHandler}>{name}</Link>
        </li>
    )
}