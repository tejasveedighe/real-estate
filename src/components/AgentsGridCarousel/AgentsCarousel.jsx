import React from "react";
import styles from "./AgentsCarousel.module.css";
import classNames from "classnames";
import Carousel from "react-multi-carousel";
import { AgentProfileCard } from "../AgentProfileCard/AgentProfileCard";

const responsiveAgent = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const agents = [
  {
    name: "Jimmy Changa",
    id: 1,
  },
  {
    name: "Nick R. Bocker",
    id: 2,
  },
  {
    name: "Buster Hyaman",
    id: 3,
  },
  {
    name: "Buster ock",
    id: 4,
  },
];

export function AgentsCarousel() {
  return (
    <section className={classNames("text-center mt-5", styles.agentSection)}>
      <h1>Our Agents</h1>
      <span>
        Get started by choosing from one of our pre-built page tempates to
        showcase your properties.
      </span>

      <Carousel
        responsive={responsiveAgent}
        autoPlay
        infinite
        partialVisbile={false}
        itemClass={styles.agentCardContainer}
        containerClass={classNames(styles.agentCarousel, "container-fluid")}
      >
        {agents.map((agent) => (
          <AgentProfileCard agent={agent} />
        ))}
      </Carousel>
    </section>
  );
}
