import { Layout } from '@/components/Layout'
import styles from './styles.module.scss'
import Image from 'next/image';

const PoliticaDePrivacidad = () => {
  return (
    <Layout title='Aviso de privacidad Integral'>
      <div className={styles.policy}>
        <div className={styles.container}>
          <div>
            <Image
              src='/assets/logo-frigorifico-negro.svg'
              alt='image login'
              width={300}
              height={200}
            />
            <h1 className={styles.policy__title}>Política de privacidad de Cuatro Carnes</h1>
            <p className={styles.policy__p}>
              Última actualización: 12/07/2023
            </p>
            <p className={styles.policy__p}>
              En Cuatro Carnes, nos comprometemos a proteger y respetar su privacidad. Esta política de privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que obtenemos a través de nuestro sitio web. Lea detenidamente esta política para comprender cómo tratamos su información personal.
            </p>
            <h2 className={styles.policy__subtitle}>1. Información que recopilamos:</h2>
            <p className={styles.policy__p}>
              Cuando visita nuestro sitio web, podemos recopilar información personal que usted proporciona voluntariamente, como su nombre, dirección de correo electrónico y número de teléfono, cuando se registra en nuestro sitio, se suscribe a nuestro boletín o nos envía consultas a través de nuestro formulario de contacto.
            </p>
            <p className={styles.policy__p}>
              Además, podemos recopilar información no personal de manera automática, como su dirección IP, tipo de navegador, sistema operativo y datos demográficos generales. Esta información se recopila de forma anónima y no se puede utilizar para identificarlo personalmente.
            </p>
            <h2 className={styles.policy__subtitle}>2. Uso de la información recopilada:</h2>
            <p className={styles.policy__p}>
              Utilizamos la información personal que recopilamos para los siguientes fines:
            </p>
            <ul className={styles.policy__list}>
              <li>Procesar sus pedidos y entregar los productos solicitados.</li>
              <li>Responder a sus consultas y brindarle información solicitada.</li>
              <li>Enviarle comunicaciones de marketing, promociones y boletines informativos, si ha dado su consentimiento para recibirlas.</li>
              <li>Mejorar nuestros productos, servicios y experiencia del sitio web.</li>
              <li>Cumplir con nuestras obligaciones legales y resolver disputas.</li>
            </ul>
            <h2 className={styles.policy__subtitle}>3. Divulgación de información a terceros:</h2>
            <p className={styles.policy__p}>
              No vendemos, intercambiamos ni transferimos su información personal a terceros sin su consentimiento, excepto en los siguientes casos limitados:
            </p>
            <ul className={styles.policy__list}>
              <li>Proveedores de servicios: Podemos compartir su información con terceros que nos ayudan a brindar servicios en nuestro nombre, como el procesamiento de pagos y la entrega de productos. Estos proveedores de servicios solo tienen acceso a la información necesaria para realizar sus funciones y deben mantener la confidencialidad de dicha información.</li>
              <li>Requisitos legales: Podemos divulgar su información personal si así lo exige la ley o si creemos de buena fe que dicha divulgación es necesaria para proteger nuestros derechos, cumplir con una orden judicial o responder a un proceso legal válido.</li>
            </ul>
            <h2 className={styles.policy__subtitle}>4. Seguridad de la información:</h2>
            <p className={styles.policy__p}>
              Implementamos medidas de seguridad razonables para proteger su información personal contra pérdida, uso indebido o acceso no autorizado. Sin embargo, tenga en cuenta que ninguna transmisión de datos por Internet es 100% segura y no podemos garantizar la seguridad de la información transmitida a través de nuestro sitio web.
            </p>
            <h2 className={styles.policy__subtitle}>5. Enlaces a sitios web de terceros:</h2>
            <p className={styles.policy__p}>
              Nuestro sitio web puede contener enlaces a sitios web de terceros. Esta política de privacidad no se aplica a dichos sitios y no somos responsables de las prácticas de privacidad o el contenido de dichos sitios web. Le recomendamos que revise las políticas de privacidad de esos sitios antes de proporcionar cualquier información personal.
            </p>
            <h2 className={styles.policy__subtitle}>6. Sus derechos:</h2>
            <p className={styles.policy__p}>
              Usted tiene derechos sobre su información personal y puede ejercer los siguientes derechos en relación con sus datos:
            </p>
            <ul className={styles.policy__list}>
              <li>Acceso: Puede solicitar información sobre los datos personales que tenemos sobre usted.</li>
              <li>Rectificación: Puede corregir o actualizar cualquier dato personal inexacto o incompleto.</li>
              <li>Eliminación: Puede solicitar la eliminación de su información personal, sujeto a ciertas excepciones previstas por la ley.</li>
              <li>Restricción de procesamiento: Puede solicitar la restricción del procesamiento de sus datos personales en ciertas circunstancias.</li>
              <li>Objeción al procesamiento: Puede oponerse al procesamiento de sus datos personales en ciertas circunstancias.</li>
              <li>Portabilidad de datos: Puede solicitar la transferencia de sus datos personales a otro controlador de datos.</li>
            </ul>
            <h2 className={styles.policy__subtitle}>7. Cambios a esta política de privacidad:</h2>
            <p className={styles.policy__p}>
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Cualquier cambio que realicemos será publicado en esta página y la fecha de actualización se modificará en consecuencia. Le recomendamos que revise periódicamente esta política para estar al tanto de cualquier cambio.
            </p>
            <p className={styles.policy__p}>
              Si tiene alguna pregunta o inquietud acerca de nuestra política de privacidad, por favor contáctenos a través de la información proporcionada en nuestro sitio web.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PoliticaDePrivacidad;