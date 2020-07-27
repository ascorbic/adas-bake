import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default function RecipePreview({ recipe }) {
  return (
    <div className={styles.preview}>
      <Link to={`/recipes/${recipe.slug}`}>
        <Img alt={recipe.title} fluid={recipe.image.fluid} />
      </Link>
      <h3 className={styles.previewTitle}>
        <Link to={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
      </h3>
      <small>{recipe.publishDate}</small>
      <div
        dangerouslySetInnerHTML={{
          __html: recipe.description.childMarkdownRemark.html,
        }}
      />
    </div>
  )
}
