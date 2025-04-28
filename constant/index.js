const cloudConfigs = [
    { key: "cloudName", value: "dkgw7hu7k" },
    { key: "uploadPreset", value: "Rentals" },
  ];
  
const PAYMENT_STATUS = {
    PENDING: "pending",
    COMPLETED: "completed",
    FAILED: "failed",
  };
  
const CATEGORIES = {
    House: "House",
    Shop: "Shop",
    Hall: "Hall Booking",
    Office: "Office",
    Land: "Land",
    Apartment: "Apartment",
    Hotel: "Hotel",
    Restaurant: "Restaurant",
    Warehouse: "Warehouse",
    Factory: "Factory",
    Garage: "Garage",
    Store: "Store",
    Farm: "Farm",
    Villa: "Villa",
    Studio: "Studio",
    Bungalow: "Bungalow",
    Penthouse: "Penthouse",
    
  };
module.exports = {CATEGORIES, PAYMENT_STATUS, cloudConfigs};