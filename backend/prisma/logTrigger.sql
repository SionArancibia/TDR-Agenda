-- Crear la función que registrará los cambios en la tabla Message
CREATE OR REPLACE FUNCTION log_message_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO Log (change, createAt, appointmentId) 
    VALUES ('Message created', now(), NULL); -- NULL para appointmentId ya que los mensajes no están directamente relacionados con citas
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO Log (change, createAt, appointmentId) 
    VALUES ('Message updated', now(), NULL);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO Log (change, createAt, appointmentId) 
    VALUES ('Message deleted', now(), NULL);
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger que llama a la función al insertar, actualizar o eliminar un mensaje
CREATE TRIGGER message_changes
AFTER INSERT OR UPDATE OR DELETE ON Message
FOR EACH ROW EXECUTE FUNCTION log_message_changes();
