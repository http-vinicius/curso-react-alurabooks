import { useState } from "react"
import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"

import imagemPrincipal from './assets/login.png'

import './ModalLoginUsuario.css'
import http from "../../http"

interface ModalLoginUsuarioProps {
    open: boolean;
    onClose: () => void;
}

const ModalLoginUsuario = ({ open, onClose }: ModalLoginUsuarioProps) => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
   
    const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const usuario = {
            email,
            senha,
        }
        http.post('/public/login', usuario)
            .then((res) => {
                sessionStorage.setItem('token', res.data.access_token)
                setEmail('')
                setSenha('')
                onClose()
            })
            .catch((erro) => {
                if (erro?.response?.data?.message){
                    alert(erro.response.data.message)
                } else {
                    alert('Aconteceu um erro inesperado ao efetuar o seu login!')
                }
            })
    }

    return (<AbModal
        titulo="Login"
        aberta={open}
        aoFechar={onClose}
    >
        <section className="corpoModalCadastro">
            <figure>
                <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
            </figure>
            <form onSubmit={aoSubmeterFormular}>
                <AbCampoTexto
                    label="E-mail"
                    value={email}
                    onChange={setEmail}
                    type="email"
                />
                <AbCampoTexto
                    label="Senha"
                    value={senha}
                    onChange={setSenha}
                    type="password"
                />
                <div className="acoes">
                    <AbBotao texto="Cadastrar" />
                </div>
            </form>
        </section>
    </AbModal>)
}

export default ModalLoginUsuario