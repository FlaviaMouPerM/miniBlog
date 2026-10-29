import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hook
import { useAuthentication } from "./hooks/useAuthentication";
import { useState, useEffect } from "react";

import Home from "./pages/Home/Home"
import About from "./pages/About/About";

//context
import { AuthProvider } from "./context/AuthContext";
//!components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Utilizador autenticado:", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth])


console.log("**************")
      console.log(user)

      const loadingUser = user === undefined; 

  if(loadingUser){
    return <p>Carregando ...</p>
}


  return (
    <>
     <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-screen flex flex-col font-montserrat">
            <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
                <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>} />
                <Route path="/post/create" element={user ? <CreatePost /> : <Navigate to="/login"/>} />
                <Route path="/dashboard" element={user ? <Dashboard /> :  <Navigate to="/login"/>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
