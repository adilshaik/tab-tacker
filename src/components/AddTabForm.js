import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useModelContext } from "../context/ModalContext";

export const AddTabForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setIsOpen } = useModelContext();
  const [name, setName] = useState("");
  const [tabletsPerStrip, setTabletsPerStrip] = useState(0);
  const [numberOfStrips, setNumberOfStrips] = useState(0);
  const [dosePerDay, setDosePerDay] = useState(0);
  const [boughtDate, setBoughtDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/medicine/`, {
        userId: session?.userId,
        name,
        tabletsPerStrip,
        numberOfStrips,
        dosePerDay,
        boughtDate,
      });
      if (data?.newMedicine) {
        router.reload();
        toast.success(data?.message, { toastId: data?.message });
        setIsOpen(false);
      } else {
        toast.error(data?.message, { toastId: data?.message });
      }
    } catch (error) {
      toast.error(e, { toastId: e });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-8 divide-y divide-gray-200'>
      <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
        <div className='space-y-6 sm:space-y-5'>
          <div>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>Add Your Medicine</h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Please enter details of your medicine.
            </p>
          </div>
          <div className='space-y-6 sm:space-y-5'>
            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Name
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            </div>

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='tabletsPS'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Tablets Per Strip
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  type='number'
                  name='tabletsPS'
                  id='tabletsPS'
                  value={tabletsPerStrip}
                  onChange={(e) => setTabletsPerStrip(e.target.value)}
                  className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            </div>

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='numberOS'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Number Of Strips
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  type='number'
                  name='numberOS'
                  id='numberOS'
                  value={numberOfStrips}
                  onChange={(e) => setNumberOfStrips(e.target.value)}
                  className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            </div>

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='dose'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Dose Per Day
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  type='number'
                  name='dose'
                  id='dose'
                  value={dosePerDay}
                  onChange={(e) => setDosePerDay(e.target.value)}
                  className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            </div>

            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
              <label
                htmlFor='boughtdate'
                className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
              >
                Bought Date
              </label>
              <div className='mt-1 sm:mt-0 sm:col-span-2'>
                <input
                  type='date'
                  name='boughtdate'
                  id='boughtdate'
                  value={boughtDate}
                  onChange={(e) => setBoughtDate(e.target.value)}
                  className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            onClick={() => setIsOpen(false)}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
