import { Request } from 'express';

declare module 'express' {
    export interface Request {
        user?: {
            id: string;
            rut: string;
            role: string;
            firstName: string;
            lastName: string;
            gender: string;
            // Agrega más propiedades aquí si es necesario
        };
    }
}