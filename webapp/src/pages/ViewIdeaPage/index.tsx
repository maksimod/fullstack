import { useParams } from 'react-router-dom'
import { type ViewIdeaRouteParams } from '../../lib/routes'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams
  return (
    <div>
      <h1>{ideaNick}</h1>
      <p>Description of idea 1</p>
      <div>
        <p>Text of par1 idea 1</p>
        <p>Text of par2 idea 1</p>
        <p>Text of par3 idea 1</p>
      </div>
    </div>
  )
}
