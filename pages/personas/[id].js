import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPersonas, getPersonaByID, getShows } from '../../lib/api'
import Link from 'next/link'
import PersonaShowItems from '../../components/personaShowItems'
import SideBar from "../../components/sideBar"

export default function Persona({ persona, allShows }) {
  const router = useRouter()
  if (!router.isFallback && !persona?.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div className="flex mb-4">
    <div className="w-full md:w-1/5">
      <SideBar />
    </div>
  <div className="p-4 w-full md:w-4/5">
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

  )
}
export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPersonaByID(params.id, preview, previewData)
  var show = null
  if(data?._links.shows.length>0) {
    show = await getShows()
  }
  return {
    props: {
      preview,
      persona: data,
      allShows: show,
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
