import React from "react"
import { Link } from "gatsby"
import headerStyles from "../styles/components/header.module.scss"

export default function Header(props) {
  return (
    <header
      className={`${headerStyles.header} ${props.page === 'info' &&
        headerStyles.info_page}`}
    >
      <nav
        className={headerStyles.header__nav}
        role="navigation"
        aria-label="main navigation"
      >
        <Link to="/">
          <h1>{props.title}</h1>
        </Link>
        <Link to="https://instagram.com/lionzan">
          <h2>Instagram</h2>
        </Link>
        <Link to="https://www.youtube.com/channel/UCd56kUli7syXhbDwsETkj4Q">
          <h2>YouTube</h2>
        </Link>
        <Link to="https://twitter.com/lionzan">
          <h2>Twitter</h2>
        </Link>
        <div>
          <h2>
            <Link
              to={
                props.page === 'info'
                  ? "/"
                  : "/info"
              }
              activeClassName={headerStyles.navItemActive}
            >
              {props.page === 'info'
                ? "close"
                : "info"}
            </Link>
          </h2>
        </div>
      </nav>
        <h2>Leonardo Zangrando</h2>
        <p>{props.description}</p>
    </header>
  )
}
