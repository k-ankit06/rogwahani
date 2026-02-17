import React from "react";
import LandingPageHero from "./Hero";
import AboutUsSection from "./AboutUsSection";
import CTABanner from "./CTABanner";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";

const LandingPage = () => {
    return (
        <div className="bg-black text-white">
            <LandingPageHero />
            <AboutUsSection />
            <CTABanner />
            <TestimonialsSection />
            <Footer />
        </div>
    );
};

export default LandingPage;
