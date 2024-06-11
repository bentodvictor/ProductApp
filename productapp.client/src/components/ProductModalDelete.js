import { Button, Modal } from "react-bootstrap";

export const ProductModalDelete = ({ show, onHide, onDelete }) => {
    return (
        <Modal show={show} onHide={onHide} centered >
            <Modal.Header className="bg-danger bg-gradient title">
                <Modal.Title className="text-light ">Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure?</Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="outline-secondary" onClick={onHide}>
                    <i className="bi bi-x"></i> Close
                </Button>
                <Button variant="outline-danger" onClick={onDelete}>
                    <i className="bi bi-check"></i>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}