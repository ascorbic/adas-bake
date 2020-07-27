import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import Layout from '../components/layout'
import RecipePreview from '../components/recipe-preview'

export default function BlogIndex({ location, data }) {
  const recipes = data.allContentfulRecipe.nodes
  const siteTitle = data?.site?.siteMetadata.title

  return (
    <Layout location={location}>
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className={styles.hero}>Recipes</div>
        <div className="wrapper">
          <h2 className="section-headline">Recent recipes</h2>
          <ul className="article-list">
            {recipes.map((node) => {
              return (
                <li key={node.slug}>
                  <RecipePreview recipe={node} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query RecipesIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulRecipe(sort: { fields: [createdAt], order: DESC }) {
      nodes {
        title
        slug
        createdAt(formatString: "Do MMMM, YYYY")
        image {
          fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
