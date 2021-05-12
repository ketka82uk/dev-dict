import React, { useState } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import Layout from './layout'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import styles from '../../styles/Term.module.css'

const EditForm = ({ defaultValues, id }) => {
  const [errorMessage, setErrorMessage] = useState('')

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      ...defaultValues
    }
  })

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage('')

    try {
      const res = await fetch(`/api/terms/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (res.status === 200) {
        Router.push(`/terms/${id}`)
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
  })

  return (
    <Layout>
      <div className={styles.termContainer}>
        <Container>
          <form onSubmit={onSubmit}>
            <div>
              <input
                id={styles.updateTerm}
                label="Acronym"
                defaultValue={defaultValues.term}
                type="text"
                {...register('term', { required: true })}
                name="term"
              />
              {errors.term && (
                <span role="alert" className="error">
                  {errors.term.message}
                </span>
              )}
            </div>

            <div>
              <input
                id={styles.updateTerm}
                label="Meaning"
                defaultValue={defaultValues.meaning}
                type="text"
                {...register('meaning', { required: true })}
                name="meaning"
              />
              {errors.meaning && (
                <span role="alert" className="error">
                  {errors.meaning.message}
                </span>
              )}
            </div>

            <div>
              <textarea
                id={styles.updateTerm}
                label="Description"
                rows="5"
                defaultValue={defaultValues.description}
                type="text"
                {...register('description', { required: false })}
                name="description"
              />
              {errors.description && (
                <span role="alert" className="error">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div>
              <input
                id={styles.updateTerm}
                label="Url"
                defaultValue={defaultValues.url}
                type="text"
                {...register('url', { required: false })}
                name="url"
              />
              {errors.meaning && (
                <span role="alert" className="error">
                  {errors.url.message}
                </span>
              )}
            </div>

            <div className="submit">
              <Button type="submit" className={styles.findOutMoreButton}>
                Update
              </Button>
            </div>
          </form>

          {errorMessage && (
            <p role="alert" className="errorMessage">
              {errorMessage}
            </p>
          )}
        </Container>
      </div>
    </Layout>
  )
}

export default EditForm