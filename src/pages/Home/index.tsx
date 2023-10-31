
import DatePicker from '@components/Form/DatePicker'
import { oauthSignIn } from '@providers/auth/oath2.google';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

function Home() {
  const [[start, end], setDefaultDate] = useState<[string, string]>(['', ''])
  const [defaultEmail, setDefaultEmail] = useState<string>('')
  useEffect(() => {
    const [startDate, endDate] = [
      DateTime.local({ zone: 'utc' }).startOf('day').minus({ days: 5 }).startOf('day').toISODate(), // start
      DateTime.local({ zone: 'utc' }).startOf('day').endOf('day').toISODate(), // end
    ];
    if(startDate && endDate)
      setDefaultDate([startDate, endDate])
  }, [])



  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lançamento automático de horas</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Preencha os campos correspondentes a data desejada para o lançamento.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="mb-5">
          <label 
            htmlFor="calendarId" 
            className="block text-sm font-semibold leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2.5">
            <input 
              id="calendarId" 
              type="text" 
              defaultValue={defaultEmail} 
              name="calendar_id" 
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <DatePicker defaultValue={start} label="Data inicial" name="start_date" />
          <DatePicker defaultValue={end} label="Data Final" name="end_date" />
        </div>
        <div className="mt-5">
          <button onClick={oauthSignIn} className="h-10 px-6 font-semibold rounded-md border bo  text-slate-50 bg-indigo-700" type="button">
            Lançar horas
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home