import { GetServerSideProps } from "next"

interface Props {
    username: string
}

function UserProfile(props: Props) {
    return <h1>{props.username}</h1>
}

export default UserProfile

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
    const { params, req, res } = ctx
    console.log(ctx)

    return {
        props: {
            username: 'Max'
        }
    }
}