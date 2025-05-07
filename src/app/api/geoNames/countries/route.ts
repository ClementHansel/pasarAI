// src/app/api/geoNames/countries/route.ts

import { NextResponse } from "next/server";

// Define types for GeoNames response
type Country = {
  countryName: string;
  countryCode: string;
};

type GeoNamesResponse = {
  geonames: Country[];
};

export async function GET() {
  const geoNamesUrl =
    "http://api.geonames.org/countryInfoJSON?username=greedybugz";

  try {
    const response = await fetch(geoNamesUrl);
    const countries: GeoNamesResponse = await response.json();

    if (countries.geonames) {
      const countryData = countries.geonames.map((country) => ({
        name: country.countryName,
        code: country.countryCode, // Country code
      }));

      return NextResponse.json({ countries: countryData });
    } else {
      return NextResponse.json(
        { error: "No countries found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}
