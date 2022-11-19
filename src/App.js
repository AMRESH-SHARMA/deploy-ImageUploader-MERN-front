import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ImagePage from "./pages/ImagePage";
import UploadPage from "./pages/UploadPage";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login/>} />
          <Route  path="/UploadPage" element={<UploadPage/>} />
          <Route path="/images/:userId" element={<ImagePage/>} />
          <Route path="*" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
