import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  console.log(`^^^^^^^^^^^^ form pos = [ ${mapLat} ${mapLng}]  `);

  return [mapLat, mapLng];
}
