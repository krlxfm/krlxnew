import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPersonas, getPersonaByID, getShows,getPageByUri } from '../../lib/api'
import Link from 'next/link'
import PersonaShowItems from '../../components/personaShowItems'
import SideBar from "../../components/sideBar"
import Header from '../../components/header'
import Container from '../../components/container'

export default function Persona({ persona, allShows, sidePage }) {
  const router = useRouter()
  if (!router.isFallback && !persona?.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Container>
    <Header/>
    <div className="grid grid-cols-4 gap-4">
    <div className="col-span-4 md:col-span-1">
      <SideBar data={sidePage}/>
    </div>
  <div className="col-span-4 md:col-span-3 p-3">
  <h1 className="text-2xl">{persona?.name}</h1>
  <img
  src={persona?.image}
  />
  <h1 className="text-xl" dangerouslySetInnerHTML={{ __html: persona?.bio }}></h1>
    <h1>Shows:</h1>
    <PersonaShowItems
      allShows={allShows}
        persona={persona}
    />
</div>
</div>
</Container>
  )
}
export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPersonaByID(params.id, preview, previewData)
  const sidePage = await getPageByUri("/side-bar/")
  var show = null
  if(data?._links.shows.length>0) {
    show = await getShows()
  }
  return {
    props: {
      preview,
      persona: data,
      allShows: show,
      sidePage
    },
  }
}

export async function getStaticPaths() {
  const allPersonas = await getPersonas()

  const personaPaths = []
  var statement = ""
  for (var i = 0; i < allPersonas?.items.length; i++) {
      statement = `/personas/${allPersonas.items[i].id}`
      personaPaths.push({ params: { id: statement} } || [])
    }
  return {
    paths: personaPaths,
    fallback: true,
  }
}
