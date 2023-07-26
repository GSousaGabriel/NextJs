import { GetStaticProps } from "next"
import { getFeedbacks } from "../api/feedback/index"
import { useState } from "react"

const Feedback = (props: { feedbacks: Data[] }) => {
    const { feedbacks } = props
    const [feedback, setFeedback] = useState<Data>()

    const getDetailsHandler = async (id: any) => {
        const response = await fetch('/api/feedback/' + id)
        const data = await response.json()

        setFeedback(data)
    }

    return (
        <>
            <ul>
                {feedbacks.map((feedback: Data) => (
                    <li key={feedback.id}>
                        <div>
                            <p>{feedback.feedback}</p>
                        </div>
                        <div>
                            <button onClick={getDetailsHandler.bind(this, feedback.id)}>Get details</button>
                        </div>
                    </li>
                ))}
            </ul>
            <hr />
            {feedback && <p>{feedback.feedback}</p>}
        </>
    )
}

const getStaticProps: GetStaticProps = async () => {
    const feedbacks = await getFeedbacks()

    return {
        props: { feedbacks },
        revalidate: 10
    }
}

export default Feedback

export { getStaticProps }