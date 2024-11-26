import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";

import { Footer } from "./component/Footer.jsx";
import { Navbar } from "./component/Navbar.jsx";
// Custom pages / views
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Single } from "./pages/Single.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Planets } from "./pages/Planets.jsx";
import { AddCard } from "./pages/AddCard.jsx";
import { CharacterDetails } from "./pages/CharacterDetails.jsx";
import { Starships } from "./pages/Starships.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { PlanetDetails } from "./pages/PlanetsDetails.jsx";
import { StarshipDetails } from "./pages/StarshipDetail.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { Login } from "./pages/Login.jsx";


// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Contact />} path="/contacts" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<AddCard />} path="/add-contact" />
                        <Route element={<EditContact />} path="/edit-contact" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Starships />} path="/starships" />
                        <Route element={<CharacterDetails />} path="/characters/:id" />
                        <Route element={<PlanetDetails />} path="/planets/:id" />
                        <Route element={<StarshipDetails />} path="/starships/:id" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
