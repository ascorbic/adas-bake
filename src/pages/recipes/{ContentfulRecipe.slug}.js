import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../../components/layout'

import heroStyles from '../../components/hero.module.css'

export default function RecipeTemplate({ location, data }) {
  console.log(data)

  const recipe = data.contentfulRecipe
  const siteTitle = data?.site?.siteMetadata.title

  return (
    <Layout location={location}>
      <div style={{ background: '#fff' }}>
        <Helmet title={`${recipe.title} | ${siteTitle}`} />
        {recipe.image && (
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={recipe.recipe}
              fluid={recipe.image.fluid}
            />
          </div>
        )}
        <div className="wrapper">
          <h1 className="section-headline">{recipe.title}</h1>
          <p
            style={{
              display: 'block',
            }}
          >
            {recipe.publishDate}
          </p>
          <ul>
            {recipe.ingredients.map(ing => (
              <li>{ing}</li>
            ))}
          </ul>
          <div
            dangerouslySetInnerHTML={{
              __html: recipe.method.childMarkdownRemark.html,
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query RecipeBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulRecipe(slug: { eq: $slug }) {
      slug
      description: childContentfulRecipeDescriptionTextNode {
        description
        childMarkdownRemark {
          html
        }
      }
      image {
        fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      method: childContentfulRecipeMethodTextNode {
        childMarkdownRemark {
          html
        }
        method
      }
      ingredients
      createdAt(formatString: "Do MMMM YYYY")
      title
    }
  }
`
