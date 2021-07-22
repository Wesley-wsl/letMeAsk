import logoImg from '../assets/images/logo.svg'
import { RoomCode } from '../components/RoomCode'
import { Button } from '../components/Button'
import {useParams} from 'react-router-dom'
import '../styles/room.scss'

type RoomParams = {
    id: string
}

export function Room() {

    const params = useParams<RoomParams>()

    return (
        <div id="page-room">

            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <RoomCode code={params.id}></RoomCode>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form action="">

                    <textarea placeholder='O que você quer perguntar?'></textarea>
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        <Button type='submit'>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}