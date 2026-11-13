export type Layer = { name: string; fill: "frost" | "sponge" | "fill" | string };
export type Flavour = {
  name: string; price: string;
  bg: string; frost: string; sponge: string; fill: string; accent: string;
  layers: Layer[];
};
export const LAYER_HEIGHTS = [18, 26, 9, 18, 26];

// Edit this file to change flavours, colours and prices. No other code changes needed.
export const FLAVOURS: Flavour[] = [
  { name: "Strawberry cloud", price: "₹1,200", bg: "#FF7FA8", frost: "#FFC9DC", sponge: "#FFF1CC", fill: "#E3123F", accent: "#FFD23F",
    layers: [{ name: "Strawberry buttercream", fill: "frost" }, { name: "Vanilla sponge", fill: "sponge" }, { name: "Strawberry jam", fill: "fill" }, { name: "Whipped cream", fill: "#FFFFFF" }, { name: "Vanilla sponge", fill: "sponge" }] },
  { name: "Blueberry dream", price: "₹1,350", bg: "#6F78FF", frost: "#CFC8FF", sponge: "#FFF3D1", fill: "#3A2DB8", accent: "#FFE45C",
    layers: [{ name: "Blueberry buttercream", fill: "frost" }, { name: "Lemon sponge", fill: "sponge" }, { name: "Blueberry compote", fill: "fill" }, { name: "Vanilla cream", fill: "#FFFFFF" }, { name: "Lemon sponge", fill: "sponge" }] },
  { name: "Alphonso mango", price: "₹1,300", bg: "#FFC22E", frost: "#FFD98A", sponge: "#FFF6D0", fill: "#FF6F00", accent: "#12B886",
    layers: [{ name: "Mango buttercream", fill: "frost" }, { name: "Vanilla sponge", fill: "sponge" }, { name: "Alphonso mango pulp", fill: "fill" }, { name: "Whipped cream", fill: "#FFFFFF" }, { name: "Vanilla sponge", fill: "sponge" }] },
  { name: "Pistachio cream", price: "₹1,500", bg: "#4FD1A1", frost: "#D2F5B8", sponge: "#FFF8DA", fill: "#1B8F55", accent: "#FF5C8A",
    layers: [{ name: "Pistachio buttercream", fill: "frost" }, { name: "Almond sponge", fill: "sponge" }, { name: "Pistachio praline", fill: "fill" }, { name: "Whipped cream", fill: "#FFFFFF" }, { name: "Almond sponge", fill: "sponge" }] },
];
export const toColour = (c: string) => (c.startsWith("#") ? c : `var(--${c})`);
