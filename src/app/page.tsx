"use client";

import Image from 'next/image'
import styles from './page.module.scss'
import { useState, useEffect, FormEvent } from 'react'
import { database } from './services/firebase'

type Contato={
   chave: string,
   nome: string,
   email: string,
   tel: string,
   obs: string,
}

export default function Home() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [obs, setObs] = useState('');

  const [contatos, setContatos] = useState<Contato[]>()

  useEffect(() => {

    const refContatos = database.ref('contatos');

    refContatos.on('value', resultado => {
      const resultadoContatos = Object.entries<Contato>(resultado.val() ?? {}).map(([chave, valor]) => {
        return{
          'chave': chave,
          'nome': valor.nome,
          'email': valor.email,
          'tel': valor.tel,
          'obs': valor.obs,
        }
      })

      setContatos(resultadoContatos)
    })
  }, [])

  function gravar(event: FormEvent){
    
    event.preventDefault();
    
    const ref = database.ref('contatos');

    const dados = {
      nome,
      email,
      tel,
      obs
    }
    ref.push(dados);

    setNome('');
    setEmail('');
    setTel('');
    setObs('');
  }

  function deletar(ref: string){
    const referencia = database.ref(`contatos/${ref}`).remove()
  }

  return (
    <main className={styles.container}>
      <form onSubmit={gravar}>
        <input type="text" placeholder='Nome' value={nome} onChange={event => setNome(event.target.value)}/>
        <input type="email" placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}/>
        <input type="tel" placeholder='Telefone'value={tel} onChange={event => setTel(event.target.value)}/>
        <textarea placeholder='Observações' value={obs} onChange={event => setObs(event.target.value)}></textarea>
        <button type="submit">Salvar</button>
      </form>

      <div className={styles.caixaContatos}>
        <input type="search" placeholder='Pesquisar...'/>
        {contatos?.map(contato =>{
          return(
          <div className={styles.caixaIndividual}>
          <div className={styles.boxTitulo}>
            <p className={styles.nomeTitulo}>{contato.nome}</p>
            <div>
              <a onClick={() => deletar(contato.chave)}>Excluir</a>
              <a>Editar</a>
            </div>
          </div>
          <div className={styles.dados}>
              <p>{contato.email}</p>
              <p>{contato.tel}</p>
              <p>{contato.obs}</p>
            </div>
        </div>
          )
        })}
        
      </div>
    </main>
  )
}
