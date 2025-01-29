'use server'

import { cookies } from "next/headers"

//server actions
export async function singup(state: any, formData: FormData){
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(email, password)
    console.log(email)

    if(!email || !password) return{
        error: true, 
        mensagem: 'Valores faltando'
    }

    try {
          const res = await fetch(`${ApiURL}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({email, password})
          })

            console.log(res)

                  const data = await res.json();

                  const {erro, mensagem, token} = data
                 
                  if (erro) return {erro, email, mensagem}
                  const cookieStored = await cookies()
                    cookieStored.set('restaurant-token', token, {
                      maxAge: 60*60*1 //1 hora
                    })
                    return{
                      erro, 
                      mensagem
                    }
                  }
                }
              } catch (error) {
                return{
                  erro: error,
                  mensagem: 'Valores recebidos'
                }
              }
    return{
        error: false,
        mesagem: 'Valores recebidos'
    }
