import { Link } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

export function NewRoom() {
    const { user } = useAuth()

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas." />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo-real.</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Crie uma nova sala</h2>
                    <form action="">
                        <input type="text" placeholder='Nome da sala' />
                        <Button className='button' type='submit'> Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to='/'>Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}