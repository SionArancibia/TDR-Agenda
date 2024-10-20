-- Crear la función que registrará los cambios en la tabla Appointment
CREATE OR REPLACE FUNCTION log_appointment_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO "Log" (id, change, createAt, appointmentId) 
    VALUES (gen_random_uuid(), 'Appointment created', now(), NEW.id);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO "Log" (id, change, createAt, appointmentId) 
    VALUES (gen_random_uuid(), 'Appointment updated', now(), NEW.id);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO "Log" (id, change, createAt, appointmentId) 
    VALUES (gen_random_uuid(), 'Appointment deleted', now(), OLD.id);
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger que llama a la función al insertar, actualizar o eliminar una cita
CREATE TRIGGER appointment_changes
AFTER INSERT OR UPDATE OR DELETE ON "Appointment"
FOR EACH ROW EXECUTE FUNCTION log_appointment_changes();