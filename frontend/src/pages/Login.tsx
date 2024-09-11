import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const SignUpSchema = z.object({
    rut: z.string(),
    contrasena: z.string(),
    });

    type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const Login = () => {
    const login = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors }
        } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)});
    
    //API ...
    const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
        login(data.rut, data.contrasena);
    };

    return (
        <div className="bg-gray-50 font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
            <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Iniciar Sesión</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                <label className="text-gray-800 text-sm mb-2 block">Nombre de usuario</label>
                <div className="relative flex items-center">
                <input {...register("rut")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                </div>
                </div>

                <div>
                <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                <div className="relative flex items-center">
                <input {...register("contrasena")} className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm">
                        <Link to={"/passwordRecovery"} className="text-blue-600 hover:underline font-semibold">¿Olvidaste la contraseña?</Link>
                    </div>
                </div>

                <div className="!mt-8">
                    <input type="submit" value="Ingresar" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"/>    
                </div>
                {/* <p className="text-gray-800 text-sm !mt-8 text-center">¿No tienes una cuenta? 
                    <Link to={"/signup"} className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Registrate aquí</Link>
                </p> */}
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login