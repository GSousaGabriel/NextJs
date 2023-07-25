// import { GetServerSideProps } from "next"
// import { useEffect, useState } from "react"
import { GetStaticProps } from 'next'
import useSWR from 'swr'

interface Sale {
    id: string,
    username: string,
    volume: number
}

const LastSales = (props: { sales: Sale[] }) => {
    // const [sales, setSales] = useState<Sale[]>()
    // const [loading, setLoading] = useState(true)

    const { data, error, isLoading } = useSWR('https://nextjs-6ee97-default-rtdb.firebaseio.com/sales.json', (url: string) => fetch(url)
        .then(async (response) => {
            const data = await response.json()
            const fixedSales = []
            for (const key in data) {
                fixedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                })
            }
            return fixedSales
        }))

    // useEffect(() => {
    //     fetch('https://nextjs-6ee97-default-rtdb.firebaseio.com/sales.json')
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             const fixedSales = []

    //             for (const key in data) {
    //                 fixedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 })
    //             }
    //             setSales(fixedSales)
    //             setLoading(false)
    //         })
    // }, [])

    if (error) {
        return <p>Failed to load.</p>
    } else if (!data) {
        return <p>Loading...</p>
    }

    // const { sales } = props

    return (
        <ul>
            {data!.map((sale: Sale) => <li key={sale.id}>{sale.username + ' - ' + sale.volume}</li>)}
        </ul>
    )
}

export default LastSales

// export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
//     const response = await fetch('https://nextjs-6ee97-default-rtdb.firebaseio.com/sales.json')
//     const data = await response.json()
//     const fixedSales = []

//     for (const key in data) {
//         fixedSales.push({
//             id: key,
//             username: data[key].username,
//             volume: data[key].volume
//         })
//     }

//     console.log(fixedSales)

//     if (fixedSales.length === 0) {
//         return { notFound: true }
//     }

//     return {
//         props: { sales: fixedSales }
//     }
// }

export const getStaticProps: GetStaticProps<any> = async (ctx) => {
    const response = await fetch('https://nextjs-6ee97-default-rtdb.firebaseio.com/sales.json')
    const data = await response.json()
    const fixedSales = []

    for (const key in data) {
        fixedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        })
    }

    if (fixedSales.length === 0) {
        return { notFound: true }
    }

    return {
        props: { sales: fixedSales }, revalidate: 10
    }
}