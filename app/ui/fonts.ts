import { Ubuntu, Vollkorn, Honk, Bungee_Spice } from "next/font/google";

export const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-ubuntu",
});

export const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-vollkorn",
});

export const honk = Honk({
  subsets: ["latin"],
  weight: "400",
});
