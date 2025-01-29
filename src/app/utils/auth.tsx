'use server'

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
          if (response){
                  const data = await response.json();
                  const {erro, mensagem, token} = data
                  console.log(data)
                  if (erro){
                    setMsgError(mensagem)
                  } else {
                    setCookie(undefined, 'restaurant-token', token, {
                      maxAge: 60*60*1 //1 hora
                    })
                    router.push('/')
                  }
                }
              } catch (error) {
                console.error('Erro na requisicao', error)
              }
    return{
        error: false,
        mesagem: 'Valores recebidos'
    }
