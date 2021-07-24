
import logoImg from '../assets/images/logo.svg'
import { RoomCode } from '../components/RoomCode'
import { Button } from '../components/Button'
import { useParams } from 'react-router-dom'
import '../styles/room.scss'
import { Question } from '../components/Question/index'
import { useRoom } from '../hooks/useRoom'




type RoomParams = {
    id: string
}

export function AdminRoom() {
    const params = useParams<RoomParams>()
    const roomId = params.id
    const { title, questions} = useRoom(roomId)

    return (
        <div id="page-room">

            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                    <RoomCode code={roomId}></RoomCode>
                    <Button isOutline={true}>Encerrar sala</Button>
                    </div>

                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content} author={question.author}
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    )
}