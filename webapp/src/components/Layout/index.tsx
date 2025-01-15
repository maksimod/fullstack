import { Link, Outlet } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'

import css from './index.module.scss'

// console.log(css)

export const Layout = () => {
  return (
    <div>
      <p>
        <b className={css.logo}>IdeaNick</b>
      </p>
      <ul>
        <li>
          <Link className={css.link} to={getAllIdeasRoute()}>
            All Ideas
          </Link>
        </li>
      </ul>
      <hr />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
