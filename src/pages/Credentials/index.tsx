import { FormEvent, useEffect, useState, InputHTMLAttributes } from 'react';
import { toast } from 'react-toastify';



type FormTrack = Record<"team_id" | "user_id" | "token", InputHTMLAttributes<InputEvent>> 

function Credentials() {
 
  const [defaultTeamId, setDefaultTeamId] = useState<string>('')
  const [defaultUserId, setDefaultUserId] = useState<string>('')
  const [defaultToken, setDefaultToken] = useState<string>('')
 
  useEffect(() => {
    const teamId = localStorage.getItem('clickup-team-id')
    const userId = localStorage.getItem('clickup-user-id')
    const token = localStorage.getItem('clickup-token')
    setDefaultTeamId(teamId || '')
    setDefaultUserId(userId || '')
    setDefaultToken(token || '')
  }, [])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const {team_id, user_id, token} = (e.target as unknown as { elements: FormTrack }).elements
    
    localStorage.setItem('clickup-team-id', String(team_id.value || ''))
    localStorage.setItem('clickup-user-id', String(user_id.value || ''))
    localStorage.setItem('clickup-token', String(token.value || ''))

    toast.success("Credenciais salvas com sucesso!", { draggable: false, hideProgressBar: true, theme: 'colored' });
    e.preventDefault()
 
  }


  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Credenciais do Clickup</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Preencha os campos de acordo com suas credenciais do clickup.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={onSubmit}>
        
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="mb-5">
            <label 
              htmlFor="teamId" 
              className="block text-sm font-semibold leading-6 text-gray-900">
              Team ID
            </label>
            <div className="mt-2.5">
              <input 
                id="teamId" 
                type="text" 
                defaultValue={defaultTeamId} 
                name="team_id" 
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-5">
            <label 
              htmlFor="userId" 
              className="block text-sm font-semibold leading-6 text-gray-900">
              User ID
            </label>
            <div className="mt-2.5">
              <input 
                id="userId" 
                type="text" 
                defaultValue={defaultUserId} 
                name="user_id" 
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          
          </div>
        </div>
        <div className="mb-5">
          <label 
            htmlFor="token" 
            className="block text-sm font-semibold leading-6 text-gray-900">
            Token
          </label>
          <div className="mt-2.5">
            <input 
              id="token" 
              type="text" 
              defaultValue={defaultToken} 
              name="token" 
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          
        </div>
        <div className="mt-5">
          <button className="h-10 px-6 font-semibold rounded-md border bo  text-slate-50 bg-indigo-700" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Credentials