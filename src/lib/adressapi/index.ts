import axios from "axios";

export async function getAddress(
  latitude: string,
  longitude: string
): Promise<[]> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  try {
    const response = await axios.get(url);
    const address = response.data.display_name;
    return address;
  } catch (error) {
    throw new Error("Failed to fetch address from coordinates.");
  }
}