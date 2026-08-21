import { CubeIcon, LayersIcon, ScanIcon, ShieldIcon } from "@/components/ui/Icons";

/**
 * Deliberately high level. The build sheet is explicit that implementation
 * details and security architecture must not be described here.
 */
export const technologyPillars = [
  {
    icon: CubeIcon,
    title: "Connected collectibles",
    body: "Each HitBox collectible is designed to connect with the platform, allowing collectors to claim and manage supported collectibles digitally.",
  },
  {
    icon: ScanIcon,
    title: "Simple claim process",
    body: "Collectors scan or tap a collectible using a compatible mobile device before claiming it to their account.",
  },
  {
    icon: LayersIcon,
    title: "Organized collections",
    body: "Claimed collectibles are automatically organized into collections, making them easy to browse and revisit.",
  },
  {
    icon: ShieldIcon,
    title: "Built with security in mind",
    body: "HitBox verifies collectibles before they are associated with a collector's account and uses modern authentication practices to help protect user accounts and platform data.",
  },
];
