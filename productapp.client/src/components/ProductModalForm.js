import { useEffect, useState } from "react"
import { Form, Modal, ModalTitle, Button, Row } from "react-bootstrap";

export const ProductModalForm = ({ show, onHide, onSave, product }) => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                value: product.value
            });
        }
        else
            setForm({});
    }, [product]);

    const setFields = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });

        if (!!errors)
            setErrors({
                ...errors,
                [field]: null
            })
    }

    const validateForm = () => {
        const { name, value } = form;
        const newErrors = {};

        if (!name || name === '')
            newErrors.name = 'Please, enter valid name with only strings';
        else if (name.length > 100)
            newErrors.name = 'Please, enter a name less of equal to 100 characteres';

        if (!value || value === '')
            newErrors.value = 'Please, enter valid number like xxxx,xx';
        else if (!/^\d{1,16}(\.\d{1,2})?$/.test(value))
            newErrors.value = 'Value must be a number with up to 16 digits and up to 2 decimal places';


        return newErrors;
    }

    const handleSave = (event) => {
        event.preventDefault();

        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        }
        else {
            onSave({
                name: form.name,
                value: form.value
            });
        }
        clearInputs();
    }

    const clearInputs = () => setForm({});

    return (
        <Modal show={show} onHide={() => {
            clearInputs();
            onHide();
        }} centered>
            <Modal.Header>
                <ModalTitle className="title">{product ? 'Edit product' : 'Add new product'}</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                required
                                value={form.name || ''}
                                isInvalid={!!errors.name}
                                type="text"
                                placeholder="Enter a name"
                                onChange={e => setFields('name', e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Product Value</Form.Label>
                            <Form.Control
                                required
                                value={form.value || ''}
                                isInvalid={!!errors.value}
                                step="0.01"
                                type="number"
                                placeholder="Enter a value"
                                onChange={(e) => setFields('value', e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                {errors.value}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Modal.Footer className="justify-content-between">
                        <Button variant="outline-secondary" onClick={() => {
                            clearInputs();
                            onHide();
                        }}>
                            <i className="bi bi-x"></i> Close
                        </Button>
                        <Button variant="outline-primary" onClick={handleSave}>
                            <i className="bi bi-floppy-fill"></i> Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
} 