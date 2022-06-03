import { useModelContext } from "../context/ModalContext";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MedicineDetailsTable = ({ medicines }) => {
  const { setForm, setIsOpen } = useModelContext();

  const numberOfDaysRemaining = (tabletsPerStrip, numberOfStrips, dosePerDay, boughtDate) => {
    const totalTablets = tabletsPerStrip * numberOfStrips;
    var Difference_In_Time = new Date().getTime() - new Date(boughtDate).getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return totalTablets / dosePerDay - Math.max(0, Difference_In_Days).toFixed(0);
  };

  return (
    <div className='pt-5 px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>Your Medicines</h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the medicines from your account including their name, title, email and
            role.
          </p>
        </div>
        <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
          <button
            onClick={() => {
              setIsOpen(true);
              setForm("addtab");
            }}
            className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto'
          >
            Add Medicine
          </button>
        </div>
      </div>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'
                    >
                      Tablets Per Strip
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'
                    >
                      Number Of Strips
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'
                    >
                      Dose Per Day
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'
                    >
                      Bought Date
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white text-center'>
                  {medicines?.map((medicine, index) => (
                    <tr key={medicine._id} className={index % 2 === 0 ? undefined : "bg-gray-50"}>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                        {medicine.name}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {medicine.tabletsPerStrip}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {medicine.numberOfStrips}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {medicine.dosePerDay}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {new Date(medicine.boughtDate).getDate()}{" "}
                        {months[new Date(medicine.boughtDate).getMonth()]}{" "}
                        {new Date(medicine.boughtDate).getFullYear()}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        <span className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>
                          {numberOfDaysRemaining(
                            medicine.tabletsPerStrip,
                            medicine.numberOfStrips,
                            medicine.dosePerDay,
                            medicine.boughtDate
                          )}{" "}
                          tablets remaining
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
