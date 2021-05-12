import React from 'react'
import { useRouter } from 'next/router'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import styles from '../../styles/createTerm.module.css'


const DeleteTerm = () => {
  const router = useRouter()
  const { id } = router.query
  const [open, setOpen] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/terms/${id}/delete`, {
        method: 'DELETE'
      })
      if (res.status === 200) {
        setSubmitted(true)
        router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error(error)
    }
  }

  const body = (
    <Paper className={styles.paper}>
      {!submitted
        ? (<h2 id="simple-modal-title">Sure?</h2>)
        : (<h2 id="simple-modal-title">Done!</h2>)}
      {!submitted ? (<div>
        <Button aria-label="delete" onClick={handleDelete}>Yep, delete</Button>
      </div>) :
        (<div className="modal-contents">
          <div className="modal-description">
            <p id="simple-modal-description">Acronym deleted.</p>
          </div>
          <div className="modal-footer">
            <IconButton aria-label="close" className="margin" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>)}
    </Paper>
  )

  return (
    <div>
      <Tooltip title="Delete acronym">
        <IconButton aria-label="add" onClick={handleOpen}>
          <DeleteIcon style={{ color: 'whitesmoke' }} />
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

export default DeleteTerm