import { BrowserRouter ,Routes , Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import LoginPage from "./components/LoginSignup/loginpage";
import Addbook from "./components/addBook/addBook";
function App() {
    return (
<BrowserRouter>
{/* <AppContext>
<Header/> */}
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/addbook" element={ <Addbook /> } />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/category/:id" element={<Category />} />
    <Route path="/product/:id" elemnet={<SingleProduct />}/>
</Routes>
{/* <Newsletter/> */}
{/* <Footer/> */}
{/* </AppContext> */}
</BrowserRouter>
    );
}

export default App;
