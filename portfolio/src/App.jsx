import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';

const App = () => {
    return (
        <div className="min-h-screen px-6 py-8 md:py-12 max-w-3xl mx-auto font-sans antialiased">
            <Navbar />
            <FloatingNav />
            <main className="space-y-24">
                <section id="hero"><Hero /></section>
                <section id="tech"><TechStack /></section>
                <section id="projects"><Projects /></section>
                <section id="hackathons"><Achievements /></section>
                <section id="experience"><Experience /></section>
                <Footer />
            </main>
        </div>
    );
};

export default App;
