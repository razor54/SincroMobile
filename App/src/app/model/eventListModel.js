
class EventList {
  constructor(items) {
    let index = 0;
    this.list = items.map((item) => {
      index += 1;
      return {
        key: index.toString(),
        id: item.id,
        date: item.date,
        driver_id: item.driver_id,
        gps_latitude: item.gps_latitude,
        gps_longitude: item.gps_longitude,
        location: item.location,
        plate: item.plate,
        verified: item.verified,
      };
    });
  }
}

export default function (json) {
  return new EventList(json);
}

