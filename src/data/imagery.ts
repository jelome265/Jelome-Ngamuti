import type { PreviewImage } from "../types/portfolio";

// These photographs establish the portfolio's Malawi context; they are not represented as the
// author's own workspace or as screenshots of Sitolo. Credits and licence links travel with each image.
export const lilongwePhotos = [
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Lilongwe_Area_2.jpg/960px-Lilongwe_Area_2.jpg?utm_campaign=index&utm_content=thumbnail&utm_source=commons.wikimedia.org",
    alt: "View east into Area 2 of Old Town Lilongwe from a pedestrian overpass, photographed in October 2008.",
    caption: "Old Town, Area 2 · 15 October 2008",
    credit: {
      label: "Brian Dell",
      href: "https://commons.wikimedia.org/wiki/File:Lilongwe_Area_2.jpg",
      licenseLabel: "public domain",
      licenseHref: "https://commons.wikimedia.org/wiki/File:Lilongwe_Area_2.jpg",
    },
  },
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/2010-10-21_15-54-14_Malawi_-_Nchesi.JPG/1280px-2010-10-21_15-54-14_Malawi_-_Nchesi.JPG?utm_campaign=index&utm_content=thumbnail&utm_source=commons.wikimedia.org",
    alt: "Roadside scene along the M1 in Nchesi, Lilongwe, with shops, vehicles and pedestrians, photographed in October 2010.",
    caption: "Nchesi, Lilongwe · 21 October 2010",
    credit: {
      label: "Hansueli Krapf",
      href: "https://commons.wikimedia.org/wiki/File:2010-10-21_15-54-14_Malawi_-_Nchesi.JPG",
      licenseLabel: "CC BY-SA 3.0",
      licenseHref: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
  },
] as const satisfies readonly PreviewImage[];
