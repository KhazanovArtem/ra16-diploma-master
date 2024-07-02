import { useEffect } from "react";
import { ProductCategoriesEnum, categories } from "../../../redux/reducers/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Category from "./Category";
import { nanoid } from "@reduxjs/toolkit";

export default function CategoryList() {
    const dispatch = useAppDispatch();
    const categoryList = useAppSelector(categories);

    useEffect(() => {
        dispatch({type: 'getCategories'});
    }, []);

    return(
        <ul className="catalog-categories nav justify-content-center">
			<Category key={nanoid()} id={ProductCategoriesEnum.allShoes} title='Все'/>
			{categoryList.length > 0 &&
                categoryList.map(category => <Category key={category.id} id={category.id} title={category.title}/>)}
		</ul>
    )
}