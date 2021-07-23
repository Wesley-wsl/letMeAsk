import { useAuth } from '../hooks/useAuth'
import { useState, FormEvent, useEffect } from 'react'
import logoImg from '../assets/images/logo.svg'
import { RoomCode } from '../components/RoomCode'
import { Button } from '../components/Button'
import { useParams } from 'react-router-dom'
import '../styles/room.scss'
import toast, { Toaster } from 'react-hot-toast';
import { database } from '../services/firebase'

const notify = () => toast.error('The users needs be login to send asks');


type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighLighted: boolean
}>

type Question = {
    id: string
    author: {
        name: string,
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighLighted: boolean
}

type RoomParams = {
    id: string
}

export function Room() {
    const { user } = useAuth()
    const params = useParams<RoomParams>()
    const roomId = params.id
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')


    useEffect(() => {

        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions

            const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestion)

        })
    }, [roomId])


    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            notify()
        }


        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user?.avatar
            },
            isHighLighted: false,
            isAnswered: false

        }

        await database.ref(`rooms/${roomId}/questions`).push(question)


        setNewQuestion('')
    }

    return (
        <div id="page-room">

            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <RoomCode code={roomId}></RoomCode>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <form action="" onSubmit={handleSendQuestion}>

                    <textarea placeholder='O que você quer perguntar?' onChange={event => setNewQuestion(event.target.value)} value={newQuestion}></textarea>

                    <div className="form-footer">

                        {
                            user ? (
                                <div className='user-info'>
                                    <img src={user.avatar} alt={user.name} />
                                    <span>{user.name}</span>
                                </div>

                            ) : (<span>Para enviar uma pergunta, <button>faça seu login</button></span>)
                        }


                        <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                        <Toaster toastOptions={{
                            className: '',
                            style: {
                                border: '1px solid black',
                                padding: '7px',
                                color: '#FF0000'
                            },
                            position: "top-right"
                        }}></Toaster>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}