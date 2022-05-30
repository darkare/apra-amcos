import { useState } from 'react'
import { Modal, Image, Button } from 'react-bootstrap'

type modalProps = {
  displayModel: boolean
  imageUrl: string
  closeModal: () => void
}

const PhotoModal = (props: modalProps) => {
  const [show] = useState(props.displayModel)

  const handleClose = () => props.closeModal();

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Image src={props.imageUrl} />
      <Modal.Footer>
        <Button variant="primay" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PhotoModal;
