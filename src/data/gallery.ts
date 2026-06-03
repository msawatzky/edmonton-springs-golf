/** Duplicate DJI exports (same bytes as the DJI_*.JPG files above). */
const DUPLICATE_FILES = new Set([
  "dji_fly_20230802_132820_265_1691024909278_photo.jpg",
  "dji_fly_20230802_135350_284_1691024751339_photo.jpg",
  "dji_fly_20230802_135356_285_1691024736508_photo.jpg",
  "dji_fly_20230802_135538_289_1691024679891_photo.jpg",
]);

const GALLERY_FILES = [
  "island-green.jpg",
  "DJI_0172.JPG",
  "DJI_0174.JPG",
  "DJI_0175.JPG",
  "DJI_0177.JPG",
  "DJI_0180.JPG",
  "DJI_0183.JPG",
  "DJI_0184.JPG",
  "DJI_0185.JPG",
  "DJI_0186.JPG",
  "DJI_0187.JPG",
  "DJI_0188.JPG",
  "DJI_0194.JPG",
  "DJI_0204.JPG",
  "DJI_0222.JPG",
  "DJI_0263.JPG",
  "DJI_0265.JPG",
  "DJI_0268.JPG",
  "DJI_0273.JPG",
  "DJI_0284.JPG",
  "DJI_0285.JPG",
  "DJI_0289.JPG",
  "dji_fly_20230709_132942_252_1688931941080_photo.jpg",
  "dji_fly_20230713_153330_210_1688931916116_photo.jpg",
  "dji_fly_20230802_132618_262_1691012600329_photo.jpg",
  "dji_fly_20230802_135344_283_1691025258458_photo.jpg",
  "driving-range.jpg",
] as const;

function galleryAlt(filename: string): string {
  if (filename === "island-green.jpg") {
    return "Island green at Edmonton Springs Golf Course";
  }
  if (filename === "driving-range.jpg") {
    return "Driving range at Edmonton Springs Golf Course";
  }
  return "Aerial view of Edmonton Springs Golf Course";
}

export const galleryPhotos = GALLERY_FILES.filter((file) => !DUPLICATE_FILES.has(file)).map(
  (filename) => ({
    src: `/images/${encodeURI(filename)}`,
    alt: galleryAlt(filename),
  }),
);
