import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TestPage from "./Components/testPage";
import ResultPage from "./Components/resultPage";


const router = createBrowserRouter([
    {path:"/",element:<App/>},
    {path:"testpage",element:<TestPage/>},
    {path:"resultpage",element:<ResultPage/>}
]);

export default router;