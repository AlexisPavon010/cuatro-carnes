import { Modal } from 'antd'

interface QuizModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void
}

export const QuizModal = ({ isModalOpen, setIsModalOpen }: QuizModalProps) => {

  const handleOk = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfoQtMtJ-qXTFddpC8upunqRUCBrkEEaxHnUyNIhsvDDyxZRw/viewform?usp=sf_link')
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      okText='Si'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText='No, continuar'
      title="¡Gracias por hacer tu pedido!"
    >
      <p>¿Te gustaría responder algunas preguntas sobre tu experiencia?</p>
    </Modal>
  )
}
