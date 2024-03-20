export async function getAddress(query: string): Promise<[]> {
    const replacedQuery = query.replace(/ /g, '%20');
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${replacedQuery}&polygon_geojson=1&format=jsonv2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json()
    } catch (error) {
      console.log(error);
      throw error;
    }
  }