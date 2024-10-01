-- trigger_log_citas.sql

CREATE OR REPLACE FUNCTION registrar_log_citas()
RETURNS TRIGGER AS $$
BEGIN
  -- Insertar un registro en el log cuando se actualiza o elimina una cita
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO "Log" (id, cita_id, cambio, create_at)
    VALUES (gen_random_uuid(), NEW.id, 'Cita actualizada: ' || OLD.tipo_servicio || ' a ' || NEW.tipo_servicio, NOW());
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO "Log" (id, cita_id, cambio, create_at)
    VALUES (gen_random_uuid(), OLD.id, 'Cita eliminada', NOW());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_citas_trigger
AFTER UPDATE OR DELETE ON "Citas"
FOR EACH ROW
EXECUTE FUNCTION registrar_log_citas();
