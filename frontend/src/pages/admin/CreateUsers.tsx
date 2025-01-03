import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validateRut} from '@fdograph/rut-utilities'; // Librería utilizada para validar el RUT: https://github.com/fdograph/rut-utilities/blob/master/README-es.md
import useCreateUsers from '../../hooks/useCreateUsers';
import { api } from '../../utils/axios';

const SignupSchema = z.object({
    rut: z.string()
        .min(1, 'El RUT es obligatorio')
        .refine(value => validateRut(value), {
            message: "RUT inválido",
        })
        .refine(value => /^\d{7,8}-[kK0-9]$/.test(value), {
            message: 'El RUT debe estar en el formato xxxxxxxx-x',
        }),
    firstName: z.string().min(1, 'El nombre es obligatorio'),
    lastName: z.string().min(1, 'El apellido es obligatorio'),
    address: z.string().min(1, 'La dirección es obligatoria'),
    age: z.number().min(1, 'La edad es obligatoria'),
    email: z.string().min(1,'El email es obligatorio').email('El email está incorrecto'),
    phoneNumber: z.number().min(1, 'El teléfono es obligatorio'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme su contraseña'),
    gender: z.enum(['male', 'female']),
    role: z.enum(['professional', 'admin', 'patient']),
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

type SignupSchemaType = z.infer<typeof SignupSchema>;

//Props opcionales, cuando se obtienen de una solicitud de registro.
interface CreateUsersProps {
    initialRut?: string;
    initialPassword?: string;
    initialEmail?: string;
    requestId?: string;
  }

const CreateUsers: React.FC<CreateUsersProps> = ({ initialRut, initialPassword, initialEmail, requestId }) => {
    const createUser = useCreateUsers(); 

    const {
        register,
        handleSubmit,
        formState: { errors }, 
        setError,
    } = useForm<SignupSchemaType>({ 
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            rut: initialRut || '',
            email: initialEmail || '',
            password: initialPassword || '',
            confirmPassword: initialPassword || '',
      } });

      const validateRequest = async (requestId: string) => {
        try {
          await api.post('/requests/validateRegistrationRequest', { requestId: requestId });
          console.log('Validación de solicitud completada exitosamente.');
        } catch (error: any) {
          console.error('Error al validar la solicitud:', error);
          throw new Error('No se pudo validar la solicitud. Inténtalo más tarde.');
        }
      };

      const onSubmit: SubmitHandler<SignupSchemaType> = async (data) => {
        try {
            await createUser(data);
            console.log("requestid", requestId)
            if (requestId) {
                await validateRequest(requestId);
                alert('Registro completado y validado exitosamente.');
            } else {
                alert('Registro completado.');
            }
        } catch (error: any) {
            if (error.response?.data?.error === "El correo electrónico ya está registrado") {
                setError("email", { type: "manual", message: "El correo electrónico ya está registrado" });
            } else {
                console.error("Error al crear el usuario:", error);
            }
        }
      };

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-lg w-full">
                    <div className="p-4 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Registrar Usuario</h2>
                        <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-2">
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">RUT</label>
                                    <input {...register("rut")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                    {errors.rut && <span className="text-red-600">{errors.rut.message}</span>}
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Nombres</label>
                                    <input {...register("firstName")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                    {errors.firstName && <span className="text-red-600">{errors.firstName.message}</span>}
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Dirección domiciliaria</label>
                                    <input {...register("address")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                    {errors.address && <span className="text-red-600">{errors.address.message}</span>}
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Teléfono</label>
                                    <input {...register("phoneNumber", { valueAsNumber: true })} type="number" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                    {errors.phoneNumber && <span className="text-red-600">{errors.phoneNumber.message}</span>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Correo electrónico</label>
                                    <input {...register("email")} type='email' className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                    {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Apellidos</label>
                                    <input {...register("lastName")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                    {errors.lastName && <span className="text-red-600">{errors.lastName.message}</span>}
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Edad</label>
                                    <input {...register("age", { valueAsNumber: true })} type="number" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                    {errors.age && <span className="text-red-600">{errors.age.message}</span>}
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                                    <input {...register("password")} type="password" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                    {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 space-y-2">
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Confirmar Contraseña</label>
                                    <input {...register("confirmPassword")} type="password" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                    {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                                </div>

                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Género</label>
                                    <select {...register('gender')} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600">
                                        <option value="male">Masculino</option>
                                        <option value="female">Femenino</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Rol</label>
                                    <select {...register('role')} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600">
                                        <option value="patient">Paciente</option>
                                        <option value="professional">Profesional</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                            </div>

                            <div className="!mt-4 col-span-1 md:col-span-2">
                                <input type="submit" value="Registrar" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUsers;