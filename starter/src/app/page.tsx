
import { PlaceholderMedia } from "@/components/brand/PlaceholderMedia";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { StepPanels } from "@/components/sections/StepPanels";
import { WorldRail } from "@/components/sections/WorldRail";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { heroSlides } from "@/data/hero-slides";
import { worldPosters } from "@/data/worlds";
import {
  claimSteps,
  hero,
  technologyHighlights,
  whatIsHitBox,
  whatIsHitBoxFeatures,
  whyCollect,
  whyCreate,
} from "@/data/home";

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <WorldRail
        title="Our worlds"
        link={{ label: "About HitBox", href: "/about" }}
        tiles={worldPosters}
      />

      {/* ---------------------------------- What is HitBox — brand-blue band */}
      <Section tone="brand">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <PlaceholderMedia label="Supporting image" ratio="video" />

          <div>
            <SectionHeading
              eyebrow="Overview"
              title={whatIsHitBox.heading}
              body={whatIsHitBox.body}
              tone="onBrand"
            />

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href="/how-it-works" variant="light">
                Learn How It Works
              </Button>

              <Button href={hero.textLink.href} variant="onArt" className="group">
                {hero.textLink.label}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        <FeatureGrid features={whatIsHitBoxFeatures} tone="onBrand" className="mt-14" />
      </Section>

      {/* ------------------------------------------------------ How it works preview */}
      <Section bordered tone="raised">
        <SectionHeading
          eyebrow="How it works"
          title="How it works"
          body="Claiming a HitBox collectible only takes a few simple steps."
        />

        <StepPanels steps={claimSteps} className="mt-12" />

        <Button href="/how-it-works" className="mt-10">
          See How It Works
        </Button>
      </Section>

      {/* ------------------------------------------------------------ Why collect */}
      <Section tone="brand">
        <SectionHeading
          eyebrow="For collectors"
          title="Why collect with HitBox?"
          body="HitBox expands the collecting experience by combining physical collectibles with digital experiences that continue long after the collectible has been received."
          tone="onBrand"
        />
        <FeatureGrid features={whyCollect} tone="onBrand" className="mt-12" />
        <Button href="/for-collectors" variant="onArt" className="mt-10">
          Explore For Collectors
        </Button>
      </Section>

      {/* ------------------------------------------------------------- Why create */}
      <Section bordered tone="raised">
        <SectionHeading
          eyebrow="For artists & creators"
          title="Why create with HitBox?"
          body="HitBox gives artists and creators a platform to connect physical merchandise with digital experiences, allowing every collectible to become part of a larger fan experience."
        />
        <FeatureGrid features={whyCreate} className="mt-12" />
        <Button href="/for-artists" variant="brandOutline" className="mt-10">
          Explore For Artists & Creators
        </Button>
      </Section>

      {/* ------------------------------------------------------------- Technology */}
      <Section tone="brand">
        <SectionHeading
          eyebrow="Technology"
          title="Technology behind every collectible"
          body="HitBox uses connected technology to link physical collectibles with digital experiences while keeping the claiming process simple and secure."
          tone="onBrand"
        />
        <FeatureGrid features={technologyHighlights} tone="onBrand" className="mt-12" />
      </Section>
    </>
  );
}
