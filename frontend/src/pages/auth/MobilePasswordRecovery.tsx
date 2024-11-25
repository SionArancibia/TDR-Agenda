import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../utils/axios";
import { useParams } from "react-router-dom";

const MobilePasswordRecovery = () => {
const { token } = useParams(); // Obtén el token de los parámetros de la URL
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      const response = await api.post("/passwordRecovery/change-password-mobile", {
        token,
        newPassword,
      });

      if (response.status === 200) {
        toast("Contraseña actualizada correctamente.");
      } else {
        toast("Error al cambiar la contraseña");
      }
    } catch (error) {
      console.error(error);
      toast("Error al cambiar la contraseña");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
      >
        <input type="hidden" value={token} readOnly />
        <label htmlFor="newPassword" className="block mb-2 font-bold">
          Nueva Contraseña:
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default MobilePasswordRecovery;
