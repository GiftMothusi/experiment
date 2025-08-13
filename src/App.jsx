import React from "react";
import Hero from "./components/Hero";
const App = () => {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Hero />
            <section className="relative h-dvh w-screen overflow-x-hidden bg-red-400"/>
        </main>
    );
};

export default App;
