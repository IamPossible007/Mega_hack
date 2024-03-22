
// import { useParams } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
// import Products from "../Products/Products";
// import "./Category.scss";
// // import AppContext from "../";
// import Header from "../Header/Header";
// const Category = () => {
//     const { id } = useParams();
//     const { data } = useFetch(
//         `/api/products?populate=*&[filters][categories][id]=${id}`
//     );
//     return (
        
//         <div className="category-main-content">
//             <AppContext>
//         <Header/>
//             <div className="layout">
//                 <div className="category-title">
//                     {
//                         data?.data?.[0]?.attributes?.categories?.data?.[0]
//                             ?.attributes?.title
//                     }
//                 </div>
//                 <Products innerPage={true} products={data} />
//             </div>
//             </AppContext>
//         </div>
//     );
// };

// export default Category;
