import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-green-500 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        'translate-x-0'
      }`}
    >
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <ul className="mt-4 mb-5.5 flex flex-col gap-4 pl-6">
            <li>
              <NavLink
                to="/"
                className="group relative flex items-center gap-4 rounded-lg px-6 py-3 font-semibold text-white text-lg duration-300 ease-in-out hover:bg-opacity-75 hover:bg-gray-600"
              >
                Panel de administrador
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="group relative flex items-center gap-4 rounded-lg px-6 py-3 font-semibold text-white text-lg duration-300 ease-in-out hover:bg-opacity-75 hover:bg-gray-600"
              >
                Usuarios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="group relative flex items-center gap-4 rounded-lg px-6 py-3 font-semibold text-white text-lg duration-300 ease-in-out hover:bg-opacity-75 hover:bg-gray-600"
              >
                Solicitudes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="group relative flex items-center gap-4 rounded-lg px-6 py-3 font-semibold text-white text-lg duration-300 ease-in-out hover:bg-opacity-75 hover:bg-gray-600"
              >
                Agenda
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="group relative flex items-center gap-4 rounded-lg px-6 py-3 font-semibold text-white text-lg duration-300 ease-in-out hover:bg-opacity-75 hover:bg-gray-600"
              >
                Estadisticas
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
