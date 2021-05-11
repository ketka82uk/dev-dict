import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import styles from '../../styles/createTerm.module.css'


const CreateTerm = () => {
  const [open, setOpen] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { handleSubmit, register, formState: { errors } } = useForm()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) {
      setErrorMessage('')
    }
    try {
      const res = await fetch('/api/terms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (res.status === 200) {
        setSubmitted(true)
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
  })

  const body = (
    <Paper className={styles.paper}>
      {!submitted
        ? (<h2 id="simple-modal-title">Create a new acronym</h2>)
        : (<h2 id="simple-modal-title">Congrats!</h2>)}
      {!submitted ? (<form className="form" onSubmit={onSubmit}>

        <div className="input-term">
          <TextField
            id="outlined-full-width"
            label="Acronym"
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginTop: 10 }}
            placeholder="WTF"
            fullWidth
            margin="normal"
            variant="outlined"
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

        <div className="input-meaning">
          <TextField
            id="outlined-full-width"
            label="Meaning"
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginTop: 10 }}
            placeholder="What The F***?"
            fullWidth
            margin="normal"
            variant="outlined"
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

        <div className="input-url">
          <TextField
            id="outlined-full-width"
            label="Url"
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginTop: 10 }}
            placeholder="http://www.yourlink.com"
            fullWidth
            margin="normal"
            variant="outlined"
            type="text"
            {...register('url', { required: false })}
            name="url"
          />
          {errors.url && (
            <span role="alert" className="error">
              {errors.url.message}
            </span>
          )}
        </div>


        <div className="input-description">
          <TextField
            id="outlined-full-width-multiline"
            label="Description"
            InputLabelProps={{
              shrink: true
            }}
            style={{ marginTop: 10 }}
            placeholder="Write a bit about it here..."
            fullWidth
            multiline
            rows={5}
            margin="normal"
            variant="outlined"
            type="text"
            {...register('description', { required: false })}
            name="description"
          />
          {errors.type && (
            <span role="alert" className="error">
              {errors.type.message}
            </span>
          )}
        </div>

        <div className="submit">
          <Button type="submit" variant="outlined" className="create-button">
            Create
          </Button>
        </div>
        <div className="modal-footer">
          <IconButton aria-label="close" className="margin" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </form>) :
        (<div className="modal-contents">
          <div className="modal-description">
            <p id="simple-modal-description">New acronym created.</p>
          </div>
          <div className="modal-footer">
            <IconButton aria-label="close" className="margin" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>)}
      {errorMessage && (
        <p role="alert" className="errorMessage">
          {errorMessage}
        </p>
      )}
    </Paper>
  )

  return (
    <div>
      <Tooltip title="Add acronym">
        <IconButton aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Modal
        className={styles.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}

export default CreateTerm