
const Header = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Otros elementos del Header pueden ir aquí */}

        <div className="flex flex-grow justify-end">
          <ul className="flex items-center gap-4">
            <li>
              <span className="block text-sm font-medium text-black dark:text-white">
                Notificaciones
              </span>
            </li>
            <li>
              <span className="block text-sm font-medium text-black dark:text-white">
                Perfil
              </span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
