
const registerPetitions = [
  {
    nombre: 'Sion arancibia',
    rut: 21341241-2,
    fecha: `13 de Junio ,2023`,
    status: 'Pendiente',
  },
  {
    nombre: 'Sion arancibia',
    rut: 21341241-2,
    fecha: `13 de Junio ,2023`,
    status: 'Pendiente',
  },
  {
    nombre: 'Sion arancibia',
    rut: 21341241-2,
    fecha: `13 de Junio ,2023`,
    status: 'Pendiente',
  },
  {
    nombre: 'Sion arancibia',
    rut: 21341241-2,
    fecha: `13 de Junio ,2023`,
    status: 'Pendiente',
  },
];

const SolicitudeTable = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              nombre
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              rut
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              fecha
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
              status
              </th>
            </tr>
          </thead>
          <tbody>
            {registerPetitions.map((user, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.nombre}
                  </h5>
                  <p className="text-sm">{user.rut}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.fecha}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    {user.status}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary"> x</button>
                    <button className="hover:text-primary"> o</button>
                    <button className="hover:text-primary"> r</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolicitudeTable;
