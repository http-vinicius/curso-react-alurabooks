import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import ModalLoginUsuario from "../ModalLoginUsuario"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'

const BarraNavegacao = () => {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')

    const [modalCadastroAberta, setModalCadastroAberta] = useState(false)
    const [modalLoginAberta, setModalLoginAberta] = useState(false)

    const [usuarioLogado, setUsuarioLogado] = useState<boolean>(token !== null)

    const handleOpenModalCadastro = () => {
        setModalCadastroAberta(true)
    }

    const handleOpenModalLogin = () => {
        setModalLoginAberta(true)
    }

    const handleCloseModalCadastro = () => {
        setModalCadastroAberta(false)
    }

    const handleCloseModalLogin = () => {
        setModalLoginAberta(false)
        setUsuarioLogado(true)
    }

    const efetuarLogout = () => {
        setUsuarioLogado(false)
        sessionStorage.removeItem('token')
        navigate('/')
    }

    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo da AluraBooks" />
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    <li>
                        <Link to="/">
                            Frontend
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Programação
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Infraestrutura
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Business
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Design e UX
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
        <ul className="acoes">
            {!usuarioLogado && (
                <>
                    <li>
                        <BotaoNavegacao
                            texto="Login"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={handleOpenModalLogin}
                        />
                        <ModalLoginUsuario open={modalLoginAberta} onClose={handleCloseModalLogin} />
                    </li>
                    <li>
                        <BotaoNavegacao
                            texto="Cadastrar-se"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={handleOpenModalCadastro}
                        />
                        <ModalCadastroUsuario open={modalCadastroAberta} onClose={handleCloseModalCadastro} />
                    </li>
                </>
            )}
            {usuarioLogado && (
                <>
                    <li>
                        <Link to="/minha-conta/pedidos">Minha Conta</Link>
                    </li>
                    <li>
                        <BotaoNavegacao 
                        texto="Logout"
                        textoAltSrc="Icone representando um usuário"
                        imagemSrc={usuario}
                        onClick={efetuarLogout}
                        />
                    </li>
                </>
            )}
        </ul>
    </nav>)
}

export default BarraNavegacao