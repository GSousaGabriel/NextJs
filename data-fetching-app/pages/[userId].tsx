import { GetServerSideProps } from "next"

interface Props {
    id: number
}

function UserIdPage(props: Props) {
    return <h1>{'user ' + +props.id}</h1>
}

export default UserIdPage

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
    const { params } = ctx
    const userId= params!.userId

    return {
        props: {
            id: userId
        }
    }
}