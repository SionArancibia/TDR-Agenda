import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreateUsers from '../hooks/useCreateUsers';

const createUsersSchema = z.object({
    rut: z.string().min(1, 'El RUT es obligatorio'),
    nombres: z.string().min(1, 'El nombre es obligatorio'),
    apellidos: z.string().min(1, 'El apellido es obligatorio'),
    domicilio: z.string().min(1, 'El domicilio es obligatorio'),
    edad: z.number().min(1, 'La edad es obligatoria'),
    telefono: z.number().min(1, 'El teléfono es obligatorio'),
    contrasena: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmarContrasena: z.string().min(6, 'Confirme su contraseña'),
    gender: z.enum(['male', 'female']),
    role: z.enum(['admin', 'professional']),
}).refine(data => data.contrasena === data.confirmarContrasena, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarContrasena"],
});

type createUsersSchemaType = z.infer<typeof createUsersSchema>;

const CreateUsers = () => {
    const createUsers = useCreateUsers(); 

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<createUsersSchemaType>({ resolver: zodResolver(createUsersSchema) });

    const onSubmit: SubmitHandler<createUsersSchemaType> = (data) => {
        //console.log(data);
        createUsers(data);
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
                                <label className="text-gray-800 text-sm mb-2 block">Nombres</label>
                                <input {...register("nombres")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.nombres && <span className="text-red-600">{errors.nombres.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Apellidos</label>
                                <input {...register("apellidos")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.apellidos && <span className="text-red-600">{errors.apellidos.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Domicilio</label>
                                <input {...register("domicilio")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.domicilio && <span className="text-red-600">{errors.domicilio.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Edad</label>
                                <input {...register("edad", { valueAsNumber: true })} type="number" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.edad && <span className="text-red-600">{errors.edad.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Teléfono</label>
                                <input {...register("telefono", { valueAsNumber: true })} type="number" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.telefono && <span className="text-red-600">{errors.telefono.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                                <input {...register("contrasena")} type="password" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.contrasena && <span className="text-red-600">{errors.contrasena.message}</span>}
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Confirmar Contraseña</label>
                                <input {...register("confirmarContrasena")} type="password" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                                {errors.confirmarContrasena && <span className="text-red-600">{errors.confirmarContrasena.message}</span>}
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
                                    <option value="admin">Administrador</option>
                                    <option value="professional">Profesional</option>
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