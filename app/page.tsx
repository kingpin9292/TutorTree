import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import { Button } from "@/components/ui/button";
import { recentSessions } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        <CompanionCard id="1" name="Companion 1" topic="Topic 1" subject="Subject 1" duration={30} color="#f2c94c" />
        <CompanionCard id="1" name="Companion 1" topic="Topic 1" subject="Subject 1" duration={30} color="#f87171" />
        <CompanionCard id="1" name="Companion 1" topic="Topic 1" subject="Subject 1" duration={30} color="#f39c12" />
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        {/* <CTA /> */}
      </section>
    </main>
  );
};

export default Page;
