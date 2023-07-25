import { Inter } from 'next/font/google'
import path from 'path'
import fs from 'fs/promises'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  console.log('loading again')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = (await fs.readFile(filePath)).toString()
  const data = JSON.parse(jsonData)

  if (!data) {
    return { redirect: { destinaton: '' } }
  } else if (data.products.length < 0) {
    return { notFound: true }
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 5
  }
}

export default function Home(props: { products: [ProductInterface] }) {
  const { products } = props
  return (
    <ul>
      {products.map((product: ProductInterface) => <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>)}
    </ul>
  )
}
