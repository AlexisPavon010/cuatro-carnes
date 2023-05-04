import { Form, Input, Modal, Result } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react'

import styles from './styles.module.scss'
import { recoveryPassword } from '@/client';

interface RecoveryPasswordProps {
  showRecovery: boolean;
  setShowRecovery: (value: boolean) => void;
}

export const RecoveryPassword = ({ showRecovery, setShowRecovery }: RecoveryPasswordProps) => {
  const [result, setResult] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <Modal
      open={showRecovery}
      onCancel={() => setShowRecovery(false)}
      footer={<></>}
    >
      {result ? (
        <Result
          status="success"
          title="¡Solicitud realizada con éxito!"
          subTitle="Por favor, revise su correo electrónico para continuar con el proceso de restablecimiento de contraseña."
        />
      ) : (
        <div className={styles.recovery__container}>
          <h2 className={styles.recovery__text}>VAMOS A AYUDARTE</h2>
          <p className={styles.recovery__description}>Introduce tu dirección de correo electrónico y te mandaremos un correo electrónico con instrucciones para restablecer tu contraseña.</p>
          <Form
            onFinish={({ email }) => {
              setLoading(true)
              recoveryPassword(email)
                .then(({ data }) => {
                  setResult(true)
                  setTimeout(() => {
                    setShowRecovery(false)
                    setResult(false)
                  }, 4000);
                })
                .catch((error) => {
                  setLoading(false)
                  console.log(error)
                })
                .finally(() => {
                  setLoading(false)
                })
            }}
          >
            <Form.Item
              name="email"
              wrapperCol={{ offset: 2, span: 20 }}
              rules={[{ required: true, message: 'Por favor inserte su correo.' }]}
            >
              <Input disabled={loading} type='email' placeholder='Correo' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6 }}>
              <button type='submit' className={styles.recovery__button}>
                {
                  loading
                    ? <LoadingOutlined className={styles.recovery__button_loading} />
                    : 'Continuar'
                }
              </button>
            </Form.Item>
          </Form>
        </div>
      )
      }
    </Modal >
  )
}
