export const getMexicanStateByZip = (zip: string): string => {
  if (!zip || zip.length < 2) return "";
  const prefix = parseInt(zip.substring(0, 2), 10);
  if (Number.isNaN(prefix)) return "";

  if (prefix >= 0 && prefix <= 16) return "Ciudad de Mexico";
  if (prefix === 20) return "Aguascalientes";
  if (prefix >= 21 && prefix <= 22) return "Baja California";
  if (prefix === 23) return "Baja California Sur";
  if (prefix === 24) return "Campeche";
  if (prefix >= 29 && prefix <= 30) return "Chiapas";
  if (prefix >= 31 && prefix <= 33) return "Chihuahua";
  if (prefix >= 25 && prefix <= 27) return "Coahuila";
  if (prefix === 28) return "Colima";
  if (prefix >= 34 && prefix <= 35) return "Durango";
  if (prefix >= 36 && prefix <= 38) return "Guanajuato";
  if (prefix >= 39 && prefix <= 41) return "Guerrero";
  if (prefix >= 42 && prefix <= 43) return "Hidalgo";
  if (prefix >= 44 && prefix <= 49) return "Jalisco";
  if (prefix >= 50 && prefix <= 57) return "Estado de Mexico";
  if (prefix >= 58 && prefix <= 61) return "Michoacan";
  if (prefix === 62) return "Morelos";
  if (prefix === 63) return "Nayarit";
  if (prefix >= 64 && prefix <= 67) return "Nuevo Leon";
  if (prefix >= 68 && prefix <= 71) return "Oaxaca";
  if (prefix >= 72 && prefix <= 75) return "Puebla";
  if (prefix === 76) return "Queretaro";
  if (prefix === 77) return "Quintana Roo";
  if (prefix >= 78 && prefix <= 79) return "San Luis Potosi";
  if (prefix >= 80 && prefix <= 82) return "Sinaloa";
  if (prefix >= 83 && prefix <= 85) return "Sonora";
  if (prefix === 86) return "Tabasco";
  if (prefix >= 87 && prefix <= 89) return "Tamaulipas";
  if (prefix === 90) return "Tlaxcala";
  if (prefix >= 91 && prefix <= 96) return "Veracruz";
  if (prefix === 97) return "Yucatan";
  if (prefix >= 98 && prefix <= 99) return "Zacatecas";

  return "";
};

export const validateCardNumber = (num: string): boolean => {
  const clean = num.replace(/\D/g, "");
  if (clean.length < 13 || clean.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};
