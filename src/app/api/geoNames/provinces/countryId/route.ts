// src/app/api/geoNames/provinces/[countryId]/route.ts

import { NextResponse } from "next/server";

// Define types for GeoNames response for provinces
type Province = {
  name: string;
  geonameId: string;
};

type GeoNamesResponse = {
  geonames: Province[];
};

export async function GET({ params }: { params: { countryId: string } }) {
  const { countryId } = params;
  const geoNamesUrl = `http://api.geonames.org/childrenJSON?geonameId=${countryId}&username=greedybugz`;

  try {
    const response = await fetch(geoNamesUrl);
    const data: GeoNamesResponse = await response.json();

    if (data.geonames) {
      const provinces = data.geonames.map((province) => ({
        name: province.name,
        code: province.geonameId,
      }));

      return NextResponse.json({ provinces });
    } else {
      return NextResponse.json(
        { error: `No provinces found for ${countryId}` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(`Error fetching provinces for ${countryId}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch provinces" },
      { status: 500 }
    );
  }
}
