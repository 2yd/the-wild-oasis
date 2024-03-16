import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'

function AddCabin() {
   return (
      <div>
         <Modal>
            <Modal.Open opens="cabin-form">
               <Button>Add new Cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
               <CreateCabinForm></CreateCabinForm>
            </Modal.Window>

            {/* <Modal.Open open='table'>
            <Button>Show Table</Button>
         </Modal.Open>
         <Modal.Window name='table'>
            <CreateCabinForm></CreateCabinForm>
         </Modal.Window> */}
         </Modal>
      </div>
   )
}

export default AddCabin
