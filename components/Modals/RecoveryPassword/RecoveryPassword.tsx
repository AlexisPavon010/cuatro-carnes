import { Form, Input, Modal } from 'antd'

import styles from './styles.module.scss'

interface RecoveryPasswordProps {
  showRecovery: boolean;
  setShowRecovery: (value: boolean) => void;
}

export const RecoveryPassword = ({ showRecovery, setShowRecovery }: RecoveryPasswordProps) => {
  return (
    <Modal
      open={showRecovery}
      onCancel={() => setShowRecovery(false)}
      footer={<></>}
    >
      <div className={styles.recovery__container}>
        <h2 className={styles.recovery__text}>VAMOS A AYUDARTE</h2>
        <p className={styles.recovery__description}>Introduce tu dirección de correo electrónico y te mandaremos un correo electrónico con instrucciones para restablecer tu contraseña.</p>
        <Form
          onFinish={() => { }}
          onFinishFailed={() => { }}
        >
          <Form.Item
            name="username"
            wrapperCol={{ offset: 2, span: 20 }}
            rules={[{ required: true, message: 'Por favor inserte su correo.' }]}
          >
            <Input type='email' placeholder='Correo' />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6 }}>
            <button type='submit' className={styles.recovery__button}> Continuar </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
