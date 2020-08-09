import React from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"
import useBlogData from '../static_queries/useBlogData'
import blogTemplateStyles from "../styles/templates/blog.module.scss"
//this component handles the blur img & fade-ins
import Img from 'gatsby-image'
import moment from 'moment';

export default function Blog(props) {
  const data = props.data.markdownRemark
  const allBlogData = useBlogData()
  const nextSlug = getNextSlug(data.fields.slug)
  const prevSlug = getPrevSlug(data.fields.slug)

  function getNextSlug(slug) {
    const allSlugs = allBlogData.map(blog => {
      return blog.node.fields.slug
    })
    const nextSlug = allSlugs[allSlugs.indexOf(slug) + 1]
    if(nextSlug !== undefined && nextSlug !== '') {
      return nextSlug
    } else {
      return allSlugs[0]
    }
  }

  function getPrevSlug(slug) {
    const allSlugs = allBlogData.map(blog => {
      return blog.node.fields.slug
    })
    const prevSlug = allSlugs[allSlugs.indexOf(slug) - 1]
    if(prevSlug !== undefined && prevSlug !== '') {
      return prevSlug
    } else {
      return allSlugs[allSlugs.length-1]
    }
  }

  return (
    <Layout>
      <article className={blogTemplateStyles.blog}>
        <figure className={blogTemplateStyles.blog__hero}>
          <Img
            fluid={data.frontmatter.hero_image.childImageSharp.fluid}
            alt={data.frontmatter.title}
          />
        </figure>
        <div className={blogTemplateStyles.blog__info}>
          <h1>{data.frontmatter.title}</h1>
          <h3>{moment(data.frontmatter.date).format("DD MMMM YYYY @ HH:mm")}</h3>
        </div>
        <div
          className={blogTemplateStyles.blog__body}
          dangerouslySetInnerHTML={{ __html: data.html }}
        ></div>
        <div className={blogTemplateStyles.blog__footer}>
          <Link to={`/blog/${prevSlug}`} className={blogTemplateStyles.footer__next}>
            <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" x="0px" y="0px" viewBox="0 0 26 26" enableBackground="new 0 0 26 26" >
              <path d="M2.687,12.294l8.714-8.715l1.414,1.414l-7.007,7.008H23.021v2h-17.213l7.007,7.006l-1.414,1.414l-8.714-8.713z"/>
            </svg>
          </Link>
          <Link to={`/blog/${nextSlug}`} className={blogTemplateStyles.footer__next}>
            <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" x="0px" y="0px" viewBox="0 0 26 26" enableBackground="new 0 0 26 26" >
              <path d="M23.021,12.294l-8.714-8.715l-1.414,1.414l7.007,7.008H2.687v2h17.213l-7.007,7.006l1.414,1.414l8.714-8.713z"/>
            </svg>
          </Link>
        </div>
      </article>
    </Layout>
  )
}

//dynamic page query, must occur within each post context
//$slug is made available by context from createPages call in gatsby-node.js
export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        author
        date
        hero_image {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`
