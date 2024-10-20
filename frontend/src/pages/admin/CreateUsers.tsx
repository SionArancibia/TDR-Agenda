import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validateRut} from '@fdograph/rut-utilities'; // Librería utilizada para validar el RUT: https://github.com/fdograph/rut-utilities/blob/master/README-es.md
import useCreateUsers from '../../hooks/useCreateUsers';

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

const CreateUsers = () => {
    const createUser = useCreateUsers(); 

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignupSchemaType>({ resolver: zodResolver(SignupSchema) });

    const onSubmit: SubmitHandler<SignupSchemaType> = (data) => {
        //console.log(data);
        createUser(data);
    };

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Regístrate</h2>
                        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">RUT</label>
                                <input {...register("rut")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.rut && <span className="text-red-600">{errors.rut.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Correo electrónico</label>
                                <input {...register("email")} type='email' className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Nombres</label>
                                <input {...register("firstName")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.firstName && <span className="text-red-600">{errors.firstName.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Apellidos</label>
                                <input {...register("lastName")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.lastName && <span className="text-red-600">{errors.lastName.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Dirección domiciliaria</label>
                                <input {...register("address")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.address && <span className="text-red-600">{errors.address.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Edad</label>
                                <input {...register("age", { valueAsNumber: true })} type="number" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.age && <span className="text-red-600">{errors.age.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Teléfono</label>
                                <input {...register("phoneNumber", { valueAsNumber: true })} type="number" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.phoneNumber && <span className="text-red-600">{errors.phoneNumber.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                                <input {...register("password")} type="password" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                            </div>

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

                            <div className="!mt-8">
                                <input type="submit" value="Registrarse" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUsers;