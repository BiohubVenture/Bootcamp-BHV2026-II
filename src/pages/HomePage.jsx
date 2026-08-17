import React from 'react';
import HeroSection from '../components/HeroSection';
import MetricsSection from '../components/MetricsSection';
import ConsortiumSection from '../components/ConsortiumSection';
import InsideBHVSection from '../components/InsideBHVSection';
import ServicesSection from '../components/ServicesSection';
import RfsSection from '../components/RfsSection';
import StartupsSection from '../components/StartupsSection';
import BootcampTimeline from '../components/BootcampTimeline';
import TestimonialsSection from '../components/TestimonialsSection';
import NextCohortBanner from '../components/NextCohortBanner';
import AbstractBioGraphics from '../components/AbstractBioGraphics';

export default function HomePage({ onOpenApply, onOpenSrl, currentLang }) {
  return (
    <div className="relative space-y-0">
      
      {/* Clean & Balanced Abstract Vector Art Composition */}
      <AbstractBioGraphics />

      {/* Main Home Sections */}
      <div className="relative z-10 space-y-0">
        <HeroSection 
          onOpenApply={onOpenApply} 
          onOpenSrl={onOpenSrl}
          currentLang={currentLang}
        />
        <MetricsSection currentLang={currentLang} />
        <ConsortiumSection currentLang={currentLang} />
        <InsideBHVSection onOpenApply={onOpenApply} currentLang={currentLang} />
        <ServicesSection currentLang={currentLang} />
        <RfsSection onOpenApply={onOpenApply} currentLang={currentLang} />
        <StartupsSection currentLang={currentLang} />
        <BootcampTimeline onOpenApply={onOpenApply} currentLang={currentLang} />
        <TestimonialsSection currentLang={currentLang} />
        <NextCohortBanner onOpenApply={onOpenApply} currentLang={currentLang} />
      </div>

    </div>
  );
}
