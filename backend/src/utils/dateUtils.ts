// src/utils/dateUtils.ts
import { format, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';

/**
 * Convierte una fecha UTC a la zona horaria local (America/Santiago).
 */
export const toLocalTime = (date: Date, timeZone = 'America/Santiago'): Date => {
  // Asegúrate de que se convierta a un objeto Date en la zona horaria especificada.
  return toZonedTime(date, timeZone);
};

/**
 * Convierte una fecha en zona horaria local a UTC para almacenamiento.
 */
export const toUTC = (date: Date, timeZone = 'America/Santiago'): Date => {
  return fromZonedTime(date, timeZone);
};

/**
 * Obtiene el nombre del día (como "Monday") en la zona horaria especificada.
 */
export const getDayName = (date: Date, timeZone = 'America/Santiago'): string => {
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, 'EEEE', { locale: enUS });
};
