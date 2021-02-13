import { getPageByUri } from '../lib/api'
import SideBar from "../components/sideBar"
import AboutHeader from "../components/about"
import Head from 'next/head'
import Container from '../components/container'
import Header from '../components/header'

export default function Contact({data, sidePage}) {
  return (
    <Container>
    <Head>
    <title>
    Contact - KRLX 88.1 FM
    </title>
    </Head>
    <Header />
    <div className="grid grid-cols-4 gap-4">
    <div className="col-span-4 md:col-span-1">
    <SideBar data={sidePage}/>
    </div>
  <div className="col-span-4 md:col-span-3 p-3">
        <AboutHeader />
        <div className="text-xl">{data.title}</div>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
  </div>
  </div>
  </Container>
  )
}

export async function getStaticProps() {
  const data = await getPageByUri("/contact/")
  const sidePage = await getPageByUri("/side-bar/")

  return {
    props: {
    data,
    sidePage
    },
  }
}
