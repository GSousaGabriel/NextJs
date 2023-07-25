import { GetStaticProps } from "next"
import path from "path"
import fs from "fs/promises"

function ProductDetail(props: { singleProd: ProductInterface }) {
    const { singleProd } = props

    if (!singleProd) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>{singleProd.title}</h1>
            <p>{singleProd.description}</p>
        </>
    )
}

export const getStaticPaths = async () => {
    const data = await getData()
    const ids = data.products.map((prod: ProductInterface) => prod.id)
    const pathParams = ids.map((id: string) => ({
        params: { productId: id }
    }))

    return {
        paths: pathParams,
        fallback: true//false;'blocking'
    }
}

export const getStaticProps: GetStaticProps<any> = async (ctx) => {
    const { params } = ctx
    const productId = params?.productId
    const data = await getData()
    const product = data.products.find((product: ProductInterface) => product.id === productId)

    if(!product){
        return {notFound: true}
    }

    return {
        props: {
            singleProd: product
        }
    }
}

const getData = async () => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = (await fs.readFile(filePath)).toString()
    const data = JSON.parse(jsonData)

    return data
}

export default ProductDetail