# Flavour showcase (scroll to change cake) – drop-in Next.js component

1. Copy the `cake-showcase` folder into your project, e.g. `components/cake-showcase/`.
2. Import it on any page and place it where you want it:

       import CakeShowcase from "@/components/cake-showcase/CakeShowcase";
       <CakeShowcase orderHref="/order" />

   (If your project has no "@/" alias, use a relative path such as "../components/cake-showcase/CakeShowcase".)
3. Edit flavours, colours, descriptions and prices in `cake-showcase/flavours.ts`.

Props (all optional): `flavours`, `orderHref` (default "#order"), `label` (default "Our flavours").

Fonts (optional but recommended): the component uses CSS variables `--font-display` and `--font-body`.
If you don't have them it falls back to Georgia / system fonts. To use the real fonts, in app/layout.tsx:

    import { Caprasimo, DM_Sans } from "next/font/google";
    const display = Caprasimo({ weight: "400", subsets: ["latin"], variable: "--font-display" });
    const body = DM_Sans({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-body" });
    <html lang="en" className={`${display.variable} ${body.variable}`}>

Notes
- Do not put the component inside a parent with `overflow: hidden/auto`; it breaks the pinned scrolling. (`overflow: clip` is fine.)
- The section is as tall as 100vh x number of flavours. Four flavours = four screens of scrolling.
- It is a client component ("use client"), so you can import it from a server page directly.
