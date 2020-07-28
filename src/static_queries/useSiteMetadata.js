import { graphql, useStaticQuery } from "gatsby"

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query getMetadata {
      site {
        siteMetadata {
          title
          description
          repoUrl
          hero_image {
            childImageSharp {
              fluid( maxWidth: 800 ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          infoData {
            contact {
              email
              github_handle
              twitter_handle
            }
            cta
            description
            background_color
          }
        }
      }
    }
  `)
  return data.site.siteMetadata
}
