// src/app/api/geoNames/cities/[provinceId]/route.ts

import { NextResponse } from "next/server";

// Define types for GeoNames response for cities
type City = {
  name: string;
  geonameId: string;
};

type GeoNamesResponse = {
  geonames: City[];
};

export async function GET({ params }: { params: { provinceId: string } }) {
  const { provinceId } = params;
  const geoNamesUrl = `http://api.geonames.org/searchJSON?adminCode1=${provinceId}&country=ID&username=greedybugz`;

  try {
    const response = await fetch(geoNamesUrl);
    const data: GeoNamesResponse = await response.json();

    if (data.geonames) {
      const cities = data.geonames.map((city) => ({
        name: city.name,
        code: city.geonameId,
      }));

      return NextResponse.json({ cities });
    } else {
      return NextResponse.json(
        { error: `No cities found for ${provinceId}` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(`Error fetching cities for ${provinceId}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
