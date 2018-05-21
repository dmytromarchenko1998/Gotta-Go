Math.radians = (degrees) => {
  return degrees * Math.PI / 180;
};

const isWithinRadius = (lat1, lon1, lat2, lon2, r) => {
  R = 6373.0

  lat1 = Math.radians(lat1)
  lon1 = Math.radians(lon1)
  lat2 = Math.radians(lat2)
  lon2 = Math.radians(lon2)

  let dLon = lon2 - lon1
  let dLat = lat2 - lat1

  let a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  distance = R * c
  console.log(distance);
}

module.exports = isWithinRadius;