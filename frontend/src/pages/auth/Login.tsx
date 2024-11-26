import React from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const LoginSchema = z.object({
    rut: z.string().min(1, 'El RUT es obligatorio').regex(/^\d{7,8}-[kK0-9]$/, 'El RUT debe estar en el formato xxxxxxxx-x'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const Login = () => {
    const login = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

    const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
        login(data.rut, data.password);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="relative min-h-screen">
            <Slider {...settings} className="absolute inset-0 z-0">
                <div>
                    <img src="./src/assets/p5.jpg" alt="Image 1" className="w-screen h-screen object-cover" />
                </div>
                <div>
                    <img src="./src/assets/p6.jpg" alt="Image 2" className="w-screen h-screen object-cover" />
                </div>
                <div>
                    <img src="./src/assets/p3.jpg" alt="Image 3" className="w-screen h-screen object-cover" />
                </div>
                <div>
                    <img src="./src/assets/p7.jpg" alt="Image 4" className="w-screen h-screen object-cover" />
                </div>
                <div>
                    <img src="./src/assets/p2.jpg" alt="Image 5" className="w-screen h-screen object-cover" />
                </div>
            </Slider>
            <div className="relative z-10 bg-gray-50 bg-opacity-5 font-[sans-serif]">
                <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                    <div className="max-w-md w-full">
                        <div className="p-8 rounded-2xl bg-white shadow">
                            <h2 className="text-gray-800 text-center text-2xl font-bold">Iniciar Sesión</h2>
                            <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>                                
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">RUT</label>
                                    <input 
                                        {...register("rut")} 
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    />
                                    {errors.rut && <span className="text-red-600 text-sm">{errors.rut.message}</span>}
                                </div>

                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Contraseña</label>
                                    <input 
                                        {...register("password")} 
                                        type="password"
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                    />
                                    {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="text-sm">
                                        <Link to={"/passwordRecovery"} className="text-blue-600 hover:underline font-semibold">¿Olvidaste la contraseña?</Link>
                                    </div>
                                </div>

                                <div className="!mt-8">
                                    <input 
                                        type="submit" 
                                        value="Ingresar" 
                                        className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;