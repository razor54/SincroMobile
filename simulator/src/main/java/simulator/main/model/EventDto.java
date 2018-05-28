package simulator.main.model;

import java.util.Date;

public class EventDto {


    private int id;

    private Date date;

    private boolean verified;

    private String plate;

    private String location;

    private String gps_location;

    private String gps_longitude;

    private String gps_latitude;

    private int driverId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getGps_location() {
        return gps_location;
    }

    public void setGps_location(String gps_location) {
        this.gps_location = gps_location;
    }

    public String getGps_longitude() {
        return gps_longitude;
    }

    public void setGps_longitude(String gps_longitude) {
        this.gps_longitude = gps_longitude;
    }

    public int getDriverId() {
        return driverId;
    }

    public void setDriverId(int driverId) {
        this.driverId = driverId;
    }


    public String getGps_latitude() {
        return gps_latitude;
    }

    public void setGps_latitude(String gps_latitude) {
        this.gps_latitude = gps_latitude;
    }
}
