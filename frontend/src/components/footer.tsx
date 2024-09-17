import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">MUNICIPALIDAD DE TEMUCO</h3>
          <p>Av. Prat 650, Temuco - Chile</p>
          <p className="mt-2">Teléfonos:</p>
          <p>Municipal: +56 297 3000</p>
          <p>Salud: +56 297 3530</p>
          <p>Educación: +56 297 3771</p>
          <p className="mt-4">
            <a href="mailto:municipio@temuco.cl" className="hover:underline">
              municipio@temuco.cl
            </a> (correo oficial)
          </p>
          <p>
            <a href="mailto:webmaster@temuco.cl" className="hover:underline">
              webmaster@temuco.cl
            </a> (soporte técnico y contenido)
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">SÍGUENOS...</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                @temucovivediferente
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col w-32 items-center">
          <img
            src="src\assets\logo2.webp" 
         

          />

        </div>
      </div>
    </footer>
  );
};

export default Footer;
