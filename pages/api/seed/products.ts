import Product from '@/models/Product'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  await Product.insertMany(JSON.parse(JSON.stringify(PRODUCT_SEED)))

  res.status(200).json({ message: 'success' })
}


const PRODUCT_SEED = [
  {
    "_id": "6494a8104ed2f2939b51926f",
    "title": "Alitas x kg",
    "price": 450,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683911721/p3trtesuvwrhlapkgibn.png",
    "kg_stock": 1,
    "offert_price": 450,
    "category": "Pollo",
    "status": true,
    "description": "$420 llevando 2kg o más.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-08-22T19:31:15.638Z",
    "stock": "KILOGRAM",
    "product_code": 805
  },
  {
    "_id": "6494a8104ed2f2939b519247",
    "title": "Arañita x paquete (0,5kg)",
    "price": 1600,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908171/rluhklnvn17zh6rc33k4.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x KG $3205. El precio publicado es un aproximado y puede variar en función al peso real. Cada paquete contiene entre 3 y 4 piezas.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:32:40.927Z",
    "kg_stock": 1,
    "offert_price": 1600,
    "product_code": 737,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519298",
    "title": "Arrollado de pollo x unidad (0,5kg)",
    "price": 1365,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914713/go3zpvzmpvbvty8aclo5.png",
    "q_stock": 1,
    "category": "Elaborados",
    "status": true,
    "description": "Arrollado de pollo cocido relleno de huevo y verduras. producto listo para consumir y envasado al vacío.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-08-23T12:32:40.282Z",
    "kg_stock": 1,
    "offert_price": 1365,
    "stock": "QUANTITY",
    "product_code": 911
  },
  {
    "_id": "6494a8104ed2f2939b519256",
    "title": "Asado americano x kg",
    "price": 3265,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909357/yfdp9fp7dozi0ugu8aws.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Bife de chorizo con hueso.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:42:26.251Z",
    "offert_price": 3265,
    "stock": "KILOGRAM",
    "product_code": 707
  },
  {
    "_id": "6494a8104ed2f2939b519253",
    "title": "Asado del centro 10 costillas x kg",
    "price": 3405,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909113/sjr60clqtpuaoeoazy2g.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Aclarar tamaño de la tira. La pieza entera pesa 4kg aprox.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192ce",
        "name": "Tamaño de tira",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Banderita",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192cf"
          },
          {
            "name": "Una sola tira",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d0"
          },
          {
            "name": "2 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d1"
          },
          {
            "name": "3 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d2"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:40:58.518Z",
    "offert_price": 3405,
    "stock": "KILOGRAM",
    "product_code": 703
  },
  {
    "_id": "6494a8104ed2f2939b519255",
    "title": "Asado del centro 6 costillas x kg",
    "price": 4765,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909257/okqcxwelnroyenxeruhu.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Aclarar tamaño de la tira (máximo 3kg por tira). La pieza entera pesa 3kg aprox.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192ce",
        "name": "Tamaño de tira",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Banderita",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192cf"
          },
          {
            "name": "Una sola tira",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d0"
          },
          {
            "name": "2 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d1"
          },
          {
            "name": "3 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d2"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:41:19.530Z",
    "offert_price": 4765,
    "stock": "KILOGRAM",
    "product_code": 705
  },
  {
    "_id": "6494a8104ed2f2939b519254",
    "title": "Asado del centro 8 costillas x kg",
    "price": 3905,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909194/znxnqfqxsssro1d4q3xh.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Aclarar tamaño de la tira. La pieza entera pesa 4kg aprox.",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192ce",
        "name": "Tamaño de tira",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Banderita",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192cf"
          },
          {
            "name": "Una sola tira",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d0"
          },
          {
            "name": "2 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d1"
          },
          {
            "name": "3 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d2"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:41:45.715Z",
    "offert_price": 3905,
    "stock": "KILOGRAM",
    "product_code": 704
  },
  {
    "_id": "6494a8104ed2f2939b519252",
    "title": "Asado del centro x kg",
    "price": 2975,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909054/rngsqorbbelxjqjv4cd0.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Tira de asado de 13 costillas. Por favor aclarar de qué tamaño quiere las tiras. Este corte no se envasa al vacío.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192ce",
        "name": "Tamaño de tira",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Banderita",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192cf"
          },
          {
            "name": "Una sola tira",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d0"
          },
          {
            "name": "2 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d1"
          },
          {
            "name": "3 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d2"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:42:42.160Z",
    "offert_price": 2975,
    "stock": "KILOGRAM",
    "product_code": 701
  },
  {
    "_id": "6494a8104ed2f2939b51926a",
    "title": "Bife ancho x kg",
    "price": 2950,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910611/ccvfxphkpd9ulo7qjts7.png",
    "kg_stock": 1,
    "offert_price": 2950,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$2880 llevando 2kg o más.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T14:36:51.410Z",
    "product_code": 741,
    "stock": "KILOGRAM",
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b519261",
    "title": "Bife angosto x kg",
    "price": 2950,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910146/qkeatpbyqp6nfp1cojq1.png",
    "kg_stock": 1,
    "offert_price": 2950,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$2880 llevando 2kg o más.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T14:37:19.153Z",
    "stock": "KILOGRAM",
    "product_code": 742
  },
  {
    "_id": "6494a8104ed2f2939b519241",
    "title": "Bife de chorizo entero (2,5kg)",
    "price": 10800,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907822/jffodse6yuofb2azr08e.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $4320. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.082Z",
    "updatedAt": "2023-09-05T14:40:44.194Z",
    "kg_stock": 1,
    "offert_price": 10800,
    "product_code": 747,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519263",
    "title": "Bife de chorizo x kg",
    "price": 4370,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910231/railic7meirqboyuqcnf.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Bife de chorizo x kg.",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T14:40:36.916Z",
    "offert_price": 4370,
    "product_code": 748,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b51925f",
    "title": "Bola de lomo x kg",
    "price": 3285,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910050/ujvklenjorbtqdwxckgy.png",
    "kg_stock": 1,
    "offert_price": 3285,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$3250 llevando 2kg o más. Envasado al vacío en bolsas de 1kg. Se filetea con corte intermedio.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192d3",
        "name": "Fileteado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Fileteado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d4"
          },
          {
            "name": "Sin filetear",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      },
      {
        "_id": "6494a8314ed2f2939b5192b8",
        "name": "Picado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Picado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192b9"
          },
          {
            "name": "Sin picar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192ba"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T14:16:07.478Z",
    "stock": "KILOGRAM",
    "product_code": 729
  },
  {
    "_id": "6494a8104ed2f2939b5192a6",
    "title": "Bolsa de leña (9kg)",
    "price": 1550,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1690908568/xlda2lidwju0s2mitdw5.png",
    "q_stock": 1,
    "category": "Varios",
    "status": true,
    "description": "Puro quebracho colorado ideal para asado.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-23T12:43:51.383Z",
    "kg_stock": 1,
    "offert_price": 1550,
    "stock": "QUANTITY",
    "product_code": 952
  },
  {
    "_id": "6494a8104ed2f2939b519275",
    "title": "Bondiola x kg",
    "price": 2965,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683912019/tloownztwroahb9abluf.png",
    "kg_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Bondiola x kg",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-08-24T15:05:53.443Z",
    "offert_price": 2965,
    "stock": "KILOGRAM",
    "product_code": 870
  },
  {
    "_id": "6494a8104ed2f2939b519274",
    "title": "Bondiola x pieza (2,8kg)",
    "price": 8190,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683911958/jc8le3lqmyle3bxuhwfj.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Precio x kg $2925. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real. Se puede marcar el hueso, aclarar cantidad de marcas.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-08-24T15:05:35.883Z",
    "kg_stock": 1,
    "offert_price": 8190,
    "product_code": 871,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b51929d",
    "title": "Caja de hamburguesas de carne (8U)",
    "price": 2705,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917141/yetuph25kabdjzcyeftw.png",
    "q_stock": 1,
    "offert_price": 2495,
    "category": "Ofertas semanales",
    "status": true,
    "description": "$2670 llevando 2 cajas o más. Hamburguesas caseras elaboradas por nosotros en medallones de 120 gramos de carne picada de roast beef y tapa de asado. Producto congelado con separadores.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-09-05T11:16:10.046Z",
    "kg_stock": 1,
    "stock": "KILOGRAM",
    "product_code": 907
  },
  {
    "_id": "6494a8104ed2f2939b5192a4",
    "title": "Carbón Fuego Ya (4kg)",
    "price": 1040,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1690908544/cfjd63oevttuudp1o9ui.png",
    "q_stock": 1,
    "category": "Varios",
    "status": true,
    "description": "Bolsa de carbón de alto rendimiento. Fuegos Ya x 4kg.\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-23T12:42:42.419Z",
    "offert_price": 1040,
    "stock": "QUANTITY",
    "kg_stock": 1,
    "product_code": 950
  },
  {
    "_id": "6494a8104ed2f2939b5192a5",
    "title": "Carbón Fuego Ya (8Kg)",
    "price": 2030,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1690908521/x3ajrxhy1flcizysst4c.png",
    "q_stock": 1,
    "category": "Varios",
    "status": true,
    "description": "Bolsa de carbón de alto rendimiento. Fuego Ya x 8kg.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-23T12:43:21.699Z",
    "offert_price": 2030,
    "stock": "QUANTITY",
    "kg_stock": 1,
    "product_code": 951
  },
  {
    "_id": "6494a8104ed2f2939b519278",
    "title": "Carre con hueso x kg",
    "price": 1765,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683912186/drczwvvik4imude4uexq.png",
    "kg_stock": 1,
    "offert_price": 1625,
    "category": "Ofertas semanales",
    "status": true,
    "description": "$1735 llevando 2kg o más. Costeletas de cerdo cortadas a 1 o 2 dedos.\n\n",
    "options": [
      {
        "_id": "649722b6aae93dc44b019023",
        "name": "Corte Carre",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes 1 dedo",
            "price": 0,
            "status": true,
            "_id": "649722b6aae93dc44b019024"
          },
          {
            "name": "Bifes 2 dedos",
            "price": 0,
            "status": true,
            "_id": "649722b6aae93dc44b019025"
          },
          {
            "name": "Entero",
            "price": 0,
            "status": true,
            "_id": "649722b6aae93dc44b019026"
          }
        ],
        "createdAt": "2023-06-24T17:07:02.795Z",
        "updatedAt": "2023-06-24T17:07:02.795Z",
        "__v": 0
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-09-05T11:12:21.677Z",
    "q_stock": 1,
    "stock": "KILOGRAM",
    "product_code": 875
  },
  {
    "_id": "6494a8104ed2f2939b519276",
    "title": "Carre deshuesado por pieza (2,5kg)",
    "price": 5962,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683912092/bkccopjozemcmchqmijr.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Precio x kg $2385. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-08-22T19:43:16.182Z",
    "kg_stock": 1,
    "offert_price": 5962,
    "product_code": 878,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b519277",
    "title": "Carre deshuesado x kg",
    "price": 2345,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683912092/bkccopjozemcmchqmijr.png",
    "kg_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Carre deshuesado x kg.",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-08-22T19:43:47.884Z",
    "offert_price": 2345,
    "product_code": 877,
    "stock": "KILOGRAM"
  },
  {
    "_id": "649730f3d847a0aabfdae3a4",
    "title": "Cañoncitos de muzzarella x paq. (1kg)",
    "price": 2780,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1687629996/lrp7gx2chpowaurqckle.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "offert_price": 2780,
    "category": "Elaborados",
    "status": true,
    "description": "Bastones de muzzarella rebozados congelados.",
    "options": [],
    "createdAt": "2023-06-24T18:07:47.756Z",
    "updatedAt": "2023-08-23T12:36:44.878Z",
    "__v": 0,
    "kg_stock": 1,
    "product_code": 917
  },
  {
    "_id": "6494a8104ed2f2939b519268",
    "title": "Chiquizuela x kg",
    "price": 625,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910460/jz0gxkvhki73wzmuscmm.png",
    "kg_stock": 1,
    "offert_price": 625,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$590 llevando 2kg o más\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T14:58:19.786Z",
    "product_code": 764,
    "stock": "KILOGRAM"
  },
  {
    "_id": "64c5351fc6c3b0312edae00a",
    "title": "Chorizo bombón x paquete (5u) 400gr",
    "price": 654,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1690911756/nybistud5gyiaye4yuaa.png",
    "stock": "KILOGRAM",
    "q_stock": 1,
    "offert_price": 654,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Precio xkg $1635, llevando 2 paquetes o más $1600 El precio publicado es un aproximado por paquete de 400gr y puede variar en función al peso real.",
    "options": [],
    "createdAt": "2023-07-29T15:49:51.940Z",
    "updatedAt": "2023-08-22T19:53:27.588Z",
    "__v": 0,
    "kg_stock": 1,
    "product_code": 852
  },
  {
    "_id": "6494a8104ed2f2939b519297",
    "title": "Chorizo colorado x unidad",
    "price": 695,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914654/pbuzfaysxodkys0iscsk.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Chorizo colorado x unidad.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-08-22T19:54:06.227Z",
    "offert_price": 695,
    "product_code": 854
  },
  {
    "_id": "6494a8104ed2f2939b51928b",
    "title": "Chorizo x paquete (5U) 0,7/0,8kg",
    "price": 1300,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913749/kwbcijwcahwhnzwsmx6d.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "kg_stock": 1,
    "offert_price": 1300,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Precio x kg $1635 Llevando 2 paquetes o más $1600. El precio publicado es un aproximado por paquete de 800gr y puede variar en función al peso real.\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192de",
        "name": "Tipo de chorizo",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Puro cerdo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192df"
          },
          {
            "name": "Mezcla",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192e0"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 2,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-08-22T19:54:49.138Z",
    "product_code": 851
  },
  {
    "_id": "6494a8104ed2f2939b51927c",
    "title": "Churrasquito x paquete (1kg)",
    "price": 2860,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683912414/qz4wye1cfnvzp4qjcoir.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Paquetes de 1kg envasado al vacío. Cada paquete tiene 1 o 2 unidades.\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-22T19:47:51.864Z",
    "kg_stock": 1,
    "offert_price": 2860,
    "product_code": 881,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b519266",
    "title": "Cima x kg",
    "price": 2900,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910387/zij5zmj6hplcjauqpss1.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Falda deshuesada. Corte fino y muy sabroso ideal para cocinar vuelta y vuelta en la parrilla.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T14:03:52.987Z",
    "offert_price": 2900,
    "stock": "KILOGRAM",
    "product_code": 721,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b519286",
    "title": "Cochinillo (6kg)",
    "price": 11700,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913435/qqvhyipzrzixv8xnfzj6.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": false,
    "description": "Precio x kg $1950. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-06-23T18:54:11.526Z"
  },
  {
    "_id": "6494a8104ed2f2939b51923b",
    "title": "Colita de cuadril x pieza (0,8-1kg)",
    "price": 3940,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907330/gw3b0gzdqfamyamgt4zp.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.082Z",
    "updatedAt": "2023-09-05T14:26:37.657Z",
    "kg_stock": 1,
    "offert_price": 3940,
    "product_code": 736,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b51923e",
    "title": "Corazon de cuadril x pieza (2,5kg)",
    "price": 8125,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907506/iv8allszgu2ewk6titrl.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $3250. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.082Z",
    "updatedAt": "2023-09-05T14:19:10.253Z",
    "kg_stock": 1,
    "offert_price": 8125,
    "stock": "QUANTITY",
    "product_code": 734
  },
  {
    "_id": "6494a8104ed2f2939b51925d",
    "title": "Corazón de cuadril x kg",
    "price": 3300,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909863/hgjpwwaneacquy65sox4.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Corazón de cuadril x kg.",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T14:26:13.295Z",
    "offert_price": 3300,
    "product_code": 735,
    "stock": "QUANTITY",
    "q_stock": 1
  },
  {
    "_id": "6497322fecabcbc87d706011",
    "title": "Corazón de cuadril x pieza (2,5kg)",
    "price": 6175,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1687630301/qetare9srgakjkb0ksej.png",
    "stock": "KILOGRAM",
    "q_stock": 1,
    "offert_price": 5850,
    "category": "Vacuno x pieza",
    "status": false,
    "description": "Precio x kg $2470. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "createdAt": "2023-06-24T18:13:03.165Z",
    "updatedAt": "2023-08-16T17:37:38.114Z",
    "__v": 1,
    "kg_stock": 1,
    "product_code": 734
  },
  {
    "_id": "6494a8104ed2f2939b519296",
    "title": "Corazón x kg",
    "price": 875,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914595/sdcitwetfmltojwbnolp.png",
    "stock": "KILOGRAM",
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Corazón x kg.\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-08-22T19:39:24.124Z",
    "offert_price": 875,
    "product_code": 833
  },
  {
    "_id": "6494a8104ed2f2939b519287",
    "title": "Cordero entero (13kg)",
    "price": 30000,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913539/xjksdr42iuxzwbnkkj5s.png",
    "q_stock": 1,
    "category": "Cordero",
    "status": true,
    "description": "Precio x kg $2355. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-08-16T20:38:21.129Z",
    "kg_stock": 1,
    "offert_price": 30000,
    "stock": "QUANTITY",
    "product_code": 892
  },
  {
    "_id": "6494a8104ed2f2939b519239",
    "title": "Costillar (8-10kg)",
    "price": 26350,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907084/foeqhyrfnyoootcbzi7j.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $2635. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real. Se puede marcar el hueso, aclarar cantidad de marcas.",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192bb",
        "name": "Marcas en los huesos",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Sin marcar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bc"
          },
          {
            "name": "1 Marca",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bd"
          },
          {
            "name": "2 Marcas",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192be"
          },
          {
            "name": "3 Marcas",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bf"
          },
          {
            "name": "4 o más (aclarar en observaciones o en Whatsapp)",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c0"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.082Z",
    "updatedAt": "2023-09-05T13:44:33.081Z",
    "kg_stock": 1,
    "offert_price": 26350,
    "stock": "KILOGRAM",
    "product_code": 706
  },
  {
    "_id": "6494a8104ed2f2939b51924f",
    "title": "Costillar a 10 costillas (4-5kg)",
    "price": 17000,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908529/cy21ea80ek2kzlvvkslw.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $3405. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192ce",
        "name": "Tamaño de tira",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Banderita",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192cf"
          },
          {
            "name": "Una sola tira",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d0"
          },
          {
            "name": "2 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d1"
          },
          {
            "name": "3 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d2"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      },
      {
        "_id": "6494a8314ed2f2939b5192bb",
        "name": "Marcas en los huesos",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Sin marcar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bc"
          },
          {
            "name": "1 Marca",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bd"
          },
          {
            "name": "2 Marcas",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192be"
          },
          {
            "name": "3 Marcas",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bf"
          },
          {
            "name": "4 o más (aclarar en observaciones o en Whatsapp)",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c0"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:45:39.502Z",
    "kg_stock": 1,
    "offert_price": 17000,
    "stock": "KILOGRAM",
    "product_code": 703
  },
  {
    "_id": "6494a8104ed2f2939b519251",
    "title": "Costillar a 6 costillas (2,5-3,5kg)",
    "price": 16500,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908606/jaccc2it7bfqmioydlge.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $4765. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192bb",
        "name": "Marcas en los huesos",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Sin marcar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bc"
          },
          {
            "name": "1 Marca",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bd"
          },
          {
            "name": "2 Marcas",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192be"
          },
          {
            "name": "3 Marcas",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bf"
          },
          {
            "name": "4 o más (aclarar en observaciones o en Whatsapp)",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c0"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:46:16.935Z",
    "kg_stock": 1,
    "offert_price": 16500,
    "product_code": 705,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b519250",
    "title": "Costillar a 8 costillas (3-4kg)",
    "price": 15620,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908568/e5shwukn4mzgwh68fyef.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $3905. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:47:01.272Z",
    "kg_stock": 1,
    "offert_price": 15620,
    "product_code": 704,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b519238",
    "title": "Costillar del centro (5-6kg)",
    "price": 17580,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683906926/khlebudnqbly1xm2dm0l.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $2930. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real. Se puede marcar el hueso, aclarar cantidad de marcas.",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192bb",
        "name": "Marcas en los huesos",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Sin marcar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bc"
          },
          {
            "name": "1 Marca",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bd"
          },
          {
            "name": "2 Marcas",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192be"
          },
          {
            "name": "3 Marcas",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192bf"
          },
          {
            "name": "4 o más (aclarar en observaciones o en Whatsapp)",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c0"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.081Z",
    "updatedAt": "2023-09-05T13:47:39.585Z",
    "kg_stock": 1,
    "offert_price": 17580,
    "product_code": 702,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b51925e",
    "title": "Cuadrada fileteada x paquete (1kg aprox)",
    "price": 3315,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909970/kppyyz6rokysakzjxwhj.png",
    "stock": "KILOGRAM",
    "kg_stock": 1,
    "offert_price": 3315,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$3280 x kg llevando 2kg o más. Envasado al vacío en bolsas de 1kg. Se filetea con corte intermedio. Todas las ofertas son válidas hasta agotar stock. Este precio aplica únicamente llevando 2 paquetes o más.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192d3",
        "name": "Fileteado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Fileteado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d4"
          },
          {
            "name": "Sin filetear",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      },
      {
        "_id": "6494a8314ed2f2939b5192b8",
        "name": "Picado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Picado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192b9"
          },
          {
            "name": "Sin picar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192ba"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T11:06:23.001Z",
    "product_code": 723,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b51927f",
    "title": "Cuerito de cerdo x kg",
    "price": 295,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913068/op71audkmofi1mqmylss.png",
    "kg_stock": 1,
    "category": "Cerdo",
    "status": false,
    "description": "Cuerito de cerdo x kg.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-22T20:03:08.504Z",
    "offert_price": 295,
    "product_code": 885,
    "stock": "QUANTITY",
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b51923a",
    "title": "Entraña x paquete (1kg)",
    "price": 5345,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907231/d8oeloug6prwuswikoj3.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "El precio publicado es un aproximado y puede variar en función al peso real. Entran 2 piezas en cada paquete.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.082Z",
    "updatedAt": "2023-09-05T13:54:14.194Z",
    "kg_stock": 1,
    "offert_price": 587,
    "product_code": 712,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519258",
    "title": "Espinazo x kg",
    "price": 780,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909473/uqahom1sqgcsordkua0g.png",
    "kg_stock": 1,
    "offert_price": 780,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$745 llevando 2kg o más.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T14:57:42.379Z",
    "product_code": 762,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b519257",
    "title": "Falda parrillera x kg",
    "price": 1870,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909429/kpgaxripklbo0zlzn4oa.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$1835 llevando 2kg o más.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T14:02:13.856Z",
    "offert_price": 1870,
    "product_code": 714,
    "stock": "KILOGRAM",
    "q_stock": 1
  },
  {
    "_id": "64a569191f761def750b3ac5",
    "title": "Filet de merluza rebozado x paq (1kg)",
    "price": 2375,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1690911696/ci2o3bmhoagg4in05o7c.png",
    "stock": "QUANTITY",
    "kg_stock": 1,
    "offert_price": 2375,
    "category": "Elaborados",
    "status": true,
    "description": "Este precio se aplica únicamente llevando 2kg o más. Promoción válida hasta agotar stock.\nProducto congelado",
    "options": [],
    "createdAt": "2023-07-05T12:59:05.785Z",
    "updatedAt": "2023-08-23T12:37:56.465Z",
    "__v": 0,
    "product_code": 918,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b51929a",
    "title": "Hamburguesa de pollo x paquete (8U)",
    "price": 1390,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917004/pzrrtue3kcihsyfcsmtj.png",
    "q_stock": 1,
    "offert_price": 1390,
    "category": "Elaborados",
    "status": true,
    "description": "$1365 llevando 2 paq. o más. Hamburguesas Noelma congeladas con separador.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-08-23T12:31:54.566Z",
    "kg_stock": 1,
    "stock": "QUANTITY",
    "product_code": 909
  },
  {
    "_id": "6494a8104ed2f2939b519292",
    "title": "Hígado x kg",
    "price": 690,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914434/surrpo8jpxluibvtc5gw.png",
    "stock": "KILOGRAM",
    "kg_stock": 1,
    "offert_price": 690,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "$665 xkg llevando 2 kg o más. No se envasa al vacío.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-08-22T19:37:37.717Z",
    "product_code": 829
  },
  {
    "_id": "6494a8104ed2f2939b519284",
    "title": "Lechón entero (13kg)",
    "price": 27000,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913347/xrpgeqhhm7a96p0l4dzq.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Precio x kg $2085. El precio publicado es un aproximado y pede variar dependiendo del peso real de la pieza. Pedir con anticipación.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192db",
        "name": "Congelado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Congelado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192dc"
          },
          {
            "name": "Descongelado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192dd"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-16T20:10:56.482Z",
    "kg_stock": 1,
    "offert_price": 27000,
    "product_code": 889,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519295",
    "title": "Lengua x unidad (1,8kg)",
    "price": 3051,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914560/adzn2d3majennizalyqn.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Precio x kg $1695. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-08-22T19:35:10.917Z",
    "offert_price": 3051,
    "product_code": 826
  },
  {
    "_id": "6494a8104ed2f2939b519240",
    "title": "Lomo (1,7kg)",
    "price": 9000,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907776/yhorwbmjnobhem4wnzi4.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $5320. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.082Z",
    "updatedAt": "2023-09-05T14:34:33.690Z",
    "kg_stock": 1,
    "offert_price": 9000,
    "stock": "QUANTITY",
    "product_code": 739
  },
  {
    "_id": "6494a8104ed2f2939b51924a",
    "title": "Lomo sin cordon (1,5kg)",
    "price": 9577,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908329/zd4omzgyahqlkjhxxcg1.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $6385. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:35:50.478Z",
    "kg_stock": 1,
    "offert_price": 9577,
    "product_code": 740,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b51924c",
    "title": "Marucha x pieza (2kg)",
    "price": 4140,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908410/q4ywsy1i6dfvjm8vctei.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $2070. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:39:16.798Z",
    "kg_stock": 1,
    "offert_price": 4140,
    "product_code": 746,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b51924e",
    "title": "Matambre entero (1,5kg)",
    "price": 4530,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908487/ddadkb7nzaoc2ngegrv7.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $3020. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:55:00.675Z",
    "kg_stock": 1,
    "offert_price": 4530,
    "product_code": 713,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b51927b",
    "title": "Matambrito x pieza (0,5-0,7kg)",
    "price": 3130,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683912361/drb0fakux2xqjgehrb8e.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "El precio es aproximado y puede variar en función al peso real.\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-22T19:48:10.278Z",
    "kg_stock": 1,
    "offert_price": 3130,
    "stock": "KILOGRAM",
    "product_code": 882
  },
  {
    "_id": "6494a8104ed2f2939b5192a9",
    "title": "Mayonesa estilo casero (500cc)",
    "price": 960,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917920/ffjlb2rpqgu6nteyae0w.png",
    "q_stock": 1,
    "category": "Varios",
    "status": true,
    "description": "Mayonesa Lágrimas del Sol producida en La Pampa con aceite de girasol.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.092Z",
    "updatedAt": "2023-08-22T20:09:58.320Z",
    "kg_stock": 1,
    "offert_price": 960,
    "product_code": 966,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519273",
    "title": "Medallones de pollo x paquete (1kg)",
    "price": 1795,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683911906/knuxva9btmg4r4xrsxby.png",
    "q_stock": 1,
    "category": "Elaborados",
    "status": false,
    "description": "Medallones de pollo x paquete (1kg).\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-09-06T17:16:04.816Z",
    "kg_stock": 1,
    "offert_price": 1795,
    "stock": "QUANTITY",
    "product_code": 912
  },
  {
    "_id": "6494a8104ed2f2939b519288",
    "title": "Medio cordero (6kg)",
    "price": 14000,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913598/ezaixkvusmxshve3w8hd.png",
    "q_stock": 1,
    "category": "Cordero",
    "status": true,
    "description": "Precio x kg $2355. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-08-16T20:39:06.818Z",
    "kg_stock": 1,
    "offert_price": 14000,
    "stock": "QUANTITY",
    "product_code": 893
  },
  {
    "_id": "6494a8104ed2f2939b519285",
    "title": "Medio lechón (6kg)",
    "price": 12810,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913347/xrpgeqhhm7a96p0l4dzq.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Pedir con anticipación. Precio x kg $2135. El precio publicado es un aproximado y puede variar dependiendo del peso real de la pieza.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192db",
        "name": "Congelado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Congelado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192dc"
          },
          {
            "name": "Descongelado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192dd"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-16T20:10:12.438Z",
    "kg_stock": 1,
    "offert_price": 12810,
    "product_code": 888,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519299",
    "title": "Milanesa de pollo x caja (1kg)",
    "price": 2030,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683916950/t92txddp4tjuqqufpycz.png",
    "q_stock": 1,
    "offert_price": 1870,
    "category": "Ofertas semanales",
    "status": true,
    "description": "$2000 llevando 2 paquetes o más. Suprema rebozada elaborada por nosotros con una sola pasada.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-09-05T11:13:31.674Z",
    "kg_stock": 1,
    "stock": "KILOGRAM",
    "product_code": 900
  },
  {
    "_id": "6494a8104ed2f2939b51929b",
    "title": "Milanesas de carne x paquete (1kg)",
    "price": 3350,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917051/hkleo8mca7rbetgv5ug7.png",
    "q_stock": 1,
    "offert_price": 3350,
    "category": "Ofertas semanales",
    "status": true,
    "description": "$3315 llevando 2 paq. o más. Nalga rebozada elaborada por nosotros con una sola pasada. Congelada con separador.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-09-05T15:11:40.761Z",
    "kg_stock": 1,
    "stock": "QUANTITY",
    "product_code": 905
  },
  {
    "_id": "6494a8104ed2f2939b51929c",
    "title": "Milanesas de cerdo x caja (1kg)",
    "price": 2620,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917103/ettkzmkf2drgjpyvnw6g.png",
    "q_stock": 1,
    "offert_price": 2620,
    "category": "Elaborados",
    "status": true,
    "description": "$2590 llevando 2 paq. o más. Carré de cerdo rebozado con una sola pasada elaborado por nosotros. Producto congelado con separadores.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-22T20:12:32.853Z",
    "kg_stock": 1,
    "stock": "QUANTITY",
    "product_code": 903
  },
  {
    "_id": "64973175d4332209f4f999ef",
    "title": "Milanesas de pollo en caja Noelma (6kg)",
    "price": 10805,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1687630081/lxicxjor0fagwfehkhfr.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "offert_price": 10805,
    "category": "Elaborados",
    "status": true,
    "description": "Supremas rebozadas marca Noelma.\nCongeladas con separadores.",
    "options": [],
    "createdAt": "2023-06-24T18:09:57.805Z",
    "updatedAt": "2023-08-22T20:11:44.848Z",
    "__v": 0,
    "kg_stock": 1,
    "product_code": 902
  },
  {
    "_id": "6494a8104ed2f2939b51928f",
    "title": "Molleja x paquete (0,5kg)",
    "price": 1600,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914281/dsnevdipr0rzrl5jwbrb.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Precio x kg $3205. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real. Entran 2 o 3 por paquete.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-08-22T19:36:38.031Z",
    "offert_price": 1600
  },
  {
    "_id": "6494a8104ed2f2939b519293",
    "title": "Mondongo x kg",
    "price": 1345,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914478/fc4eqxwgytsuxmy6pkqj.png",
    "stock": "KILOGRAM",
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Mondongo x kg.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-08-22T19:38:18.749Z",
    "offert_price": 1345,
    "product_code": 831
  },
  {
    "_id": "6494a8104ed2f2939b51928d",
    "title": "Morcilla bombón x paquete (6U)",
    "price": 290,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914206/carrh6z2bbfjuk23djtj.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "kg_stock": 1,
    "offert_price": 290,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Precio x kg $830. \nLlevando 2kg o más $800. El precio publicado es un aproximado por paquete de 350gr y puede variar en función al peso real.\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-08-22T19:56:35.508Z",
    "product_code": 857
  },
  {
    "_id": "6494a8104ed2f2939b51928e",
    "title": "Morcilla rosca x unidad (0,5kg)",
    "price": 415,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914247/fpre4teaj4tuhfs9xmgk.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "kg_stock": 1,
    "offert_price": 415,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Precio x kg $830. \nLlevando 2kg o más $800. El precio publicado es un aproximado por paquete de 500gr y puede variar en función al peso real.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-08-22T19:55:49.719Z",
    "product_code": 856
  },
  {
    "_id": "6494a8104ed2f2939b51928c",
    "title": "Morcilla vasca x paquete (2U)",
    "price": 300,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914166/aaqz9ayieqep35d2kwgi.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Precio x kg $1015. El precio publicado es un aproximado por paquete de 300gr y puede variar en función al peso real. Cada paquete contiene 2 unidades.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-08-22T19:57:33.251Z",
    "offert_price": 300,
    "product_code": 859
  },
  {
    "_id": "64e77fb8e540b883bf1b01a9",
    "title": "Muzzarella x paquete (0.5kg aprox)",
    "price": 1412.5,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1692892732/bev3dobhqh8wby9ut36t.png",
    "stock": "KILOGRAM",
    "q_stock": 1,
    "product_code": 965,
    "offert_price": 2640,
    "category": "Ofertas semanales",
    "status": true,
    "description": "$2825 x kg. Queso Muzzarella artesanal envasado al vacío. ",
    "options": [],
    "createdAt": "2023-08-24T16:05:12.107Z",
    "updatedAt": "2023-09-05T11:21:04.118Z",
    "__v": 0,
    "kg_stock": 1
  },
  {
    "_id": "64d7833a39e171ab02e52f33",
    "title": "NUEVO Milanesas de Peceto",
    "price": 3800,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1691845325/zugswozwhapiuiww9ofl.png",
    "stock": "QUANTITY",
    "kg_stock": 1,
    "product_code": 926,
    "offert_price": 3525,
    "category": "Ofertas semanales",
    "status": true,
    "description": "Milanesas de Peceto rebozadas. Congeladas en caja de 1kg, con separadores.",
    "options": [],
    "createdAt": "2023-08-12T13:03:54.041Z",
    "updatedAt": "2023-09-05T15:12:47.526Z",
    "__v": 0,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b519260",
    "title": "Nalga x paquete 1kg",
    "price": 3895,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910106/cmul5zc9h8bbvnbeym8j.png",
    "kg_stock": 1,
    "offert_price": 3895,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$3860 x kg llevando 2kg o más .Nalga fileteada (corte intermedio) envasada al vacío en paquetes de 1kg aproximadamente.\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192b8",
        "name": "Picado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Picado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192b9"
          },
          {
            "name": "Sin picar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192ba"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      },
      {
        "_id": "6494a8314ed2f2939b5192d3",
        "name": "Fileteado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Fileteado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d4"
          },
          {
            "name": "Sin filetear",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T14:07:01.849Z",
    "product_code": 725,
    "stock": "KILOGRAM",
    "q_stock": 1
  },
  {
    "_id": "64e79d0c38dbc82cc4f61aa1",
    "title": "Nuggets Gigantes x paquete (1kg aprox)",
    "price": 2620,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1692900474/mdyxfvhyhasyvjfwgqxy.png",
    "stock": "KILOGRAM",
    "q_stock": 1,
    "product_code": 914,
    "offert_price": 2620,
    "category": "Elaborados",
    "status": true,
    "description": "Nuggets marca grangys. Todas las ofertas son válidas hasta agotar stock.",
    "options": [],
    "createdAt": "2023-08-24T18:10:20.037Z",
    "updatedAt": "2023-09-05T11:07:15.282Z",
    "__v": 0,
    "kg_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b519242",
    "title": "Ojo de bife entero (2,5kg)",
    "price": 12550,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907889/mwupjsetwlx7nbphkyd3.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $5020. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:38:05.332Z",
    "kg_stock": 1,
    "offert_price": 12550,
    "stock": "QUANTITY",
    "product_code": 744
  },
  {
    "_id": "6494a8104ed2f2939b519262",
    "title": "Ojo de bife x kg",
    "price": 5070,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910193/wx2xrslfoupn9cufhyix.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Ojo de bife x kg.\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T14:38:28.156Z",
    "offert_price": 5070,
    "stock": "KILOGRAM",
    "product_code": 745
  },
  {
    "_id": "6494a8104ed2f2939b519269",
    "title": "Osobuco del centro x kg",
    "price": 2350,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910558/ivjdr3zyii7pit1jidjb.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Parte del osobuco con más carne y hueso más chico. Cortado en rodajas.\n\n",
    "options": [
      {
        "_id": "649d8296838e8b681d51a365",
        "name": "Rodajas",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Rodajas 2 dedos.",
            "price": 0,
            "status": true,
            "_id": "649d8296838e8b681d51a366"
          },
          {
            "name": "Rodajas a 1 dedo.",
            "price": 0,
            "status": true,
            "_id": "649d82d4838e8b681d51a3c3"
          }
        ],
        "createdAt": "2023-06-29T13:09:42.620Z",
        "updatedAt": "2023-06-29T13:12:03.099Z",
        "__v": 1
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T14:55:22.815Z",
    "offert_price": 2350,
    "stock": "KILOGRAM",
    "product_code": 761
  },
  {
    "_id": "6494a8104ed2f2939b519237",
    "title": "Osobuco del rey (1,8kg)",
    "price": 4230,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683906807/czbkabtanpkchde2ioyk.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $2350. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.081Z",
    "updatedAt": "2023-09-05T14:55:28.228Z",
    "kg_stock": 1,
    "offert_price": 4230,
    "product_code": 754,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519259",
    "title": "Osobuco x kg",
    "price": 1870,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909562/c0t6iwo78uvszq35kdnp.png",
    "kg_stock": 1,
    "offert_price": 1870,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$1835 xkg llevando 2kg o más.",
    "options": [
      {
        "_id": "649d8296838e8b681d51a365",
        "name": "Rodajas",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Rodajas 2 dedos.",
            "price": 0,
            "status": true,
            "_id": "649d8296838e8b681d51a366"
          },
          {
            "name": "Rodajas a 1 dedo.",
            "price": 0,
            "status": true,
            "_id": "649d82d4838e8b681d51a3c3"
          }
        ],
        "createdAt": "2023-06-29T13:09:42.620Z",
        "updatedAt": "2023-06-29T13:12:03.099Z",
        "__v": 1
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T14:55:54.441Z",
    "product_code": 759,
    "stock": "KILOGRAM",
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b5192a7",
    "title": "Pack Cerveza Andes (6U)",
    "price": 2890,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917822/tdd6byfcvptybcue9gkg.png",
    "q_stock": 1,
    "category": "Varios",
    "status": true,
    "description": "Sixpack de cervea Andes.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192e4",
        "name": "Tipo de cerveza",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Rubia",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192e5"
          },
          {
            "name": "Roja",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192e6"
          },
          {
            "name": "IPA",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192e7"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.092Z",
    "updatedAt": "2023-08-22T20:10:43.130Z",
    "kg_stock": 1,
    "offert_price": 2890,
    "stock": "QUANTITY",
    "product_code": 967
  },
  {
    "_id": "6494a8104ed2f2939b519283",
    "title": "Paleta de cerdo x pieza (7kg)",
    "price": 10535,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913288/n5y5pegagrfhqrfdnnbi.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Precio x kg $1505.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192db",
        "name": "Congelado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Congelado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192dc"
          },
          {
            "name": "Descongelado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192dd"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-22T18:49:50.583Z",
    "kg_stock": 1,
    "offert_price": 10535,
    "product_code": 884,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b51925a",
    "title": "Paleta x kg",
    "price": 2890,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909633/chr8nna1ddbo6gasjbhk.png",
    "kg_stock": 1,
    "offert_price": 2890,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$2855 xkg llevando 2kg o más.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192c1",
        "name": "Tipo de corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Bifes de 1 dedo",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c2"
          },
          {
            "name": "Bifes de 2 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c3"
          },
          {
            "name": "Bifes de 3 dedos",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c4"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192c5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      },
      {
        "_id": "6494a8314ed2f2939b5192b8",
        "name": "Picado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Picado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192b9"
          },
          {
            "name": "Sin picar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192ba"
          },
          {
            "name": "picado 1 vez",
            "price": 0,
            "status": true,
            "_id": "6495f8f13c37db0313553382"
          },
          {
            "name": "Picado 2 veces",
            "price": 0,
            "status": true,
            "_id": "6495f903ce821dd2667cc624"
          }
        ],
        "__v": 2,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-07-19T17:50:23.756Z"
      }
    ],
    "__v": 2,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T14:03:25.610Z",
    "product_code": 717,
    "stock": "KILOGRAM",
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b519243",
    "title": "Palomita x pieza (1kg aprox)",
    "price": 2905,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907960/inuq2frwouvxa6lufbhe.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "El precio publicado es un aproximado y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192cb",
        "name": "En caso de que no haya stock",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Reemplazar por otro corte similar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192cc"
          },
          {
            "name": "No enviar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192cd"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      },
      {
        "_id": "6494a8314ed2f2939b5192b8",
        "name": "Picado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Picado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192b9"
          },
          {
            "name": "Sin picar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192ba"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:04:26.923Z",
    "kg_stock": 1,
    "offert_price": 2905,
    "product_code": 722,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b5192a8",
    "title": "Pan de papa para hamburguesa (4U)",
    "price": 750,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917878/u5pgbwlkw4svpetzc1ph.png",
    "q_stock": 1,
    "category": "Varios",
    "status": true,
    "description": "Pan de papa artesanal.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.092Z",
    "updatedAt": "2023-08-16T20:36:25.163Z",
    "kg_stock": 1,
    "offert_price": 750,
    "stock": "QUANTITY",
    "product_code": 965
  },
  {
    "_id": "6494a8104ed2f2939b519282",
    "title": "Panceta x 100 gr",
    "price": 363,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913230/butaodckmmimcs6l0nnl.png",
    "kg_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Precio x kg $3630. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-22T19:49:42.855Z",
    "offert_price": 363,
    "product_code": 887,
    "stock": "KILOGRAM",
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b5192aa",
    "title": "Papas bastón",
    "price": 1015,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917964/qf4igczwqntn12oi82xb.png",
    "q_stock": 1,
    "category": "Varios",
    "status": true,
    "description": "Papa natural pre-cocida y congelada cortada tipo baston, lista para freír.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.092Z",
    "updatedAt": "2023-08-16T20:36:59.131Z",
    "kg_stock": 1,
    "offert_price": 1015,
    "stock": "QUANTITY",
    "product_code": 919
  },
  {
    "_id": "6494a8104ed2f2939b519270",
    "title": "Pata y muslo deshuesada x paq (1kg)",
    "price": 1840,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683911755/qtbuxzgw49v53brzaftp.png",
    "kg_stock": 1,
    "category": "Pollo",
    "status": true,
    "description": "Envasado al vacío en paquetes de 1kg aprox con 4 unidades. Puede llegar congelado.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-08-22T19:27:57.194Z",
    "offert_price": 1840,
    "stock": "KILOGRAM",
    "product_code": 804
  },
  {
    "_id": "6494a8104ed2f2939b51926e",
    "title": "Pata y muslo x kg",
    "price": 850,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683911684/fnt0beiie5gajnhtj29y.png",
    "kg_stock": 1,
    "offert_price": 850,
    "category": "Pollo",
    "status": true,
    "description": "$820 x kg llevando 2kg o más. Todas las ofertas son válidas hasta agotar stock. Esta oferta aplica únocamente llevando 2kg o más\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-09-05T11:07:37.384Z",
    "stock": "KILOGRAM",
    "product_code": 802,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b519281",
    "title": "Patita de cerdo x kg",
    "price": 320,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913185/eghxks8y6shrsrxqqtyo.png",
    "kg_stock": 1,
    "category": "Cerdo",
    "status": false,
    "description": "Patita de cerdo x kg.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-22T20:03:17.399Z",
    "offert_price": 320,
    "product_code": 886,
    "stock": "QUANTITY",
    "q_stock": 1
  },
  {
    "_id": "64971e56898919c634bf8a74",
    "title": "Patitas de Pollo (jamón y queso) x Paq. (1kg)",
    "price": 1915,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1687629945/okumebk4synxsxkwzaao.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "offert_price": 1915,
    "category": "Elaborados",
    "status": false,
    "description": "Producto congelado.",
    "options": [],
    "createdAt": "2023-06-24T16:48:22.906Z",
    "updatedAt": "2023-09-06T17:41:34.218Z",
    "__v": 0,
    "kg_stock": 1,
    "product_code": 916
  },
  {
    "_id": "6494a8104ed2f2939b5192a3",
    "title": "Patitas de pollo (espinaca y queso) x paq (1kg)",
    "price": 1915,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917376/gjuvblrpna7rwj9gbelf.png",
    "q_stock": 1,
    "category": "Elaborados",
    "status": true,
    "description": "Producto congelado.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-23T12:39:41.472Z",
    "kg_stock": 1,
    "offert_price": 1915,
    "stock": "QUANTITY",
    "product_code": 915
  },
  {
    "_id": "6494a8104ed2f2939b51926b",
    "title": "Peceto FILETEADO x paq (1kg aprox)",
    "price": 4055,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910654/qqzmxhilbchr03et0fpk.png",
    "kg_stock": 1,
    "offert_price": 4055,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$4020 xkg llevando 2kg o más. Envasado al vacío en bolsas de 1kg. Se filetea con corte intermedio.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T14:18:20.126Z",
    "product_code": 732,
    "stock": "QUANTITY",
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b51923f",
    "title": "Peceto x pieza (1,8kg)",
    "price": 7030,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907562/mmi9is4uqy5omtswqqdh.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $3905. El precio publicado es un aproximado por la pieza entera sin cortar y puede variar en función al peso real.\nPara peceto fileteado ir a \"Categorias\" \"Vacuno x kg\".\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.082Z",
    "updatedAt": "2023-09-05T14:17:45.044Z",
    "kg_stock": 1,
    "offert_price": 7030,
    "product_code": 731,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b519279",
    "title": "Pechito de cerdo x kg",
    "price": 1765,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683912239/jddsd8i5zh9lrfgxg6ni.png",
    "kg_stock": 1,
    "offert_price": 1765,
    "category": "Cerdo",
    "status": true,
    "description": "Llevando 2kg o más $1735. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192ce",
        "name": "Tamaño de tira",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Banderita",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192cf"
          },
          {
            "name": "Una sola tira",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d0"
          },
          {
            "name": "2 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d1"
          },
          {
            "name": "3 tiras",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d2"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-08-22T19:41:31.382Z",
    "product_code": 872,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b519280",
    "title": "Pernil de cerdo/ jamón x pieza (12kg)",
    "price": 18000,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913126/taekdgrni20knoj6zuzt.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Precio x kg $1540.\n\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192db",
        "name": "Congelado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Congelado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192dc"
          },
          {
            "name": "Descongelado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192dd"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-16T20:06:22.967Z",
    "kg_stock": 1,
    "offert_price": 18000,
    "product_code": 883,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519264",
    "title": "Picada especial x kg",
    "price": 2775,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910287/nunreqxsxeds2qs5nihc.png",
    "kg_stock": 1,
    "offert_price": 2775,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$2740 xkg llevando 2kg o más. Picada de palomita, tortuguita y roast beef con 10% de grasa. Envasado al vacío en bolsas de 1kg.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T14:56:34.766Z",
    "stock": "KILOGRAM",
    "product_code": 755,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b519265",
    "title": "Picada magra x kg",
    "price": 3050,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910326/p6wsqdvuuiom3tf7mczp.png",
    "kg_stock": 1,
    "offert_price": 3050,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$3015 xkg llevando 2kg o más. Picada con bajo porcentaje graso hecha de palomita, tortuguita y bola de lomo previamente desgrasados. Envasado al vacío en bolsas de 1kg.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T14:57:04.641Z",
    "stock": "KILOGRAM",
    "product_code": 757,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b51923c",
    "title": "Picaña x pieza (1,5 kg)",
    "price": 4040,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907392/gub3oudppt9hqtdw5r6a.png",
    "q_stock": 1,
    "category": "Ofertas semanales",
    "status": true,
    "description": "Precio x KG $4040. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.082Z",
    "updatedAt": "2023-09-05T14:33:44.149Z",
    "kg_stock": 1,
    "offert_price": 3785,
    "stock": "QUANTITY",
    "product_code": 738
  },
  {
    "_id": "6494a8104ed2f2939b51926c",
    "title": "Pollo entero (3kg)",
    "price": 2895,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683911382/o7zapuip7mit0rl9fjvs.png",
    "q_stock": 1,
    "category": "Ofertas semanales",
    "status": true,
    "description": "Precio x kg $965. El precio es un aproximado por la pieza entera (3kg aprox) y puede variar en función al peso real.\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192d6",
        "name": "Corte",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Corte de rana (parrillero)",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d7"
          },
          {
            "name": "Corte vertical",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d8"
          },
          {
            "name": "Trozado en 4",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d9"
          },
          {
            "name": "Sin cortar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192da"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T11:12:54.088Z",
    "kg_stock": 1,
    "offert_price": 2700,
    "stock": "KILOGRAM",
    "product_code": 807
  },
  {
    "_id": "6494a8104ed2f2939b51929e",
    "title": "Provoleta x unidad",
    "price": 990,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917184/b10myx7k2uled14roixy.png",
    "q_stock": 1,
    "category": "Elaborados",
    "status": true,
    "description": "Queso provolone Wapi de fabricación artesanal con la maduración justa para cocinar sobre la parrilla. Rodajas de 150 gr. aroximádamente envasadas al vacío.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-22T20:03:00.710Z",
    "kg_stock": 1,
    "offert_price": 990,
    "stock": "QUANTITY",
    "product_code": 960
  },
  {
    "_id": "6494a8104ed2f2939b51924d",
    "title": "Pulpon de vacío (2,5kg)",
    "price": 11075,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908444/tazdev5ixzw1r6zkppi7.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $4430. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.084Z",
    "updatedAt": "2023-09-05T13:49:39.958Z",
    "kg_stock": 1,
    "offert_price": 11075,
    "product_code": 711,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b5192a0",
    "title": "Queso Fontina x 100gr.",
    "price": 436,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917277/xiim1hypzramciue1a2o.png",
    "kg_stock": 1,
    "category": "Elaborados",
    "status": true,
    "description": "Queso artesanal Biolac $4360\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-22T20:06:14.659Z",
    "offert_price": 436,
    "stock": "QUANTITY",
    "product_code": 963,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b5192a1",
    "title": "Queso Pategrás x 100gr.",
    "price": 377.5,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917306/eseajui5hcjpalzpdqon.png",
    "kg_stock": 1,
    "category": "Elaborados",
    "status": true,
    "description": "Queso artesanal Biolac. Precio x kg $3755\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-22T20:05:24.718Z",
    "offert_price": 377.5,
    "stock": "QUANTITY",
    "product_code": 962,
    "q_stock": 1
  },
  {
    "_id": "64e78021ed60c0a8abd6b047",
    "title": "Queso cremoso x paquete (0,5kg aprox)",
    "price": 1305,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1692893123/djvdya2fd9psy2kwrafp.png",
    "stock": "KILOGRAM",
    "q_stock": 1,
    "product_code": 966,
    "offert_price": 1305,
    "category": "Elaborados",
    "status": true,
    "description": "$2610 x kg. Queso Cremoso artesanal envasado al vacío.",
    "options": [],
    "createdAt": "2023-08-24T16:06:57.975Z",
    "updatedAt": "2023-08-28T17:41:51.837Z",
    "__v": 0,
    "kg_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b5192a2",
    "title": "Queso gouda x 100gr",
    "price": 353,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917339/hvbbmna8cfyvl3vsqbm5.png",
    "kg_stock": 1,
    "category": "Elaborados",
    "status": true,
    "description": "Queso artesanal Biolac. Precio x kg $3535.\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-22T20:09:22.560Z",
    "offert_price": 353,
    "stock": "QUANTITY",
    "product_code": 964,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b51929f",
    "title": "Queso reggianito x 100gr.",
    "price": 460.5,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683917232/rfrqel9ptwldukff1umc.png",
    "kg_stock": 1,
    "category": "Elaborados",
    "status": true,
    "description": "Queso artesanal Biolac. Precio x kg $4605\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.091Z",
    "updatedAt": "2023-08-22T20:04:23.546Z",
    "offert_price": 460.5,
    "stock": "QUANTITY",
    "product_code": 961,
    "q_stock": 1
  },
  {
    "_id": "6494a8104ed2f2939b519294",
    "title": "Rabo vacuno x unidad (1kg)",
    "price": 1570,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914515/day9yfevgb4zoctbmwa5.png",
    "stock": "KILOGRAM",
    "q_stock": 1,
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.090Z",
    "updatedAt": "2023-08-22T19:38:53.714Z",
    "offert_price": 1570,
    "product_code": 832
  },
  {
    "_id": "6494a8104ed2f2939b519249",
    "title": "Rack ojo de bife entero (2,5kg)",
    "price": 12000,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908292/l1pvhln3ckrhywa1juh4.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $4825. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:50:01.078Z",
    "kg_stock": 1,
    "offert_price": 12000,
    "stock": "QUANTITY",
    "product_code": 750
  },
  {
    "_id": "6494a8104ed2f2939b519246",
    "title": "Rack ojo de bife indiv. (0,5kg)",
    "price": 2437,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908128/cfgdorxhm9jgtpb2aqm4.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $4875. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real. Todas las ofertas son válidas hasta agotar el stock.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:50:56.702Z",
    "kg_stock": 1,
    "offert_price": 2437,
    "product_code": 751,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b51927d",
    "title": "Ribs de cerdo x pieza (0,5-0,8kg)",
    "price": 1950,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683912449/h3ou7rmxzadjbzsvec6s.png",
    "q_stock": 1,
    "category": "Ofertas semanales",
    "status": true,
    "description": "El precio puede variar en función al peso real. Todas las ofertas son válidas hasta agotar stock. Esta oferta se aplica únicamente llevando 2kg o más.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-24T17:45:01.034Z",
    "kg_stock": 1,
    "offert_price": 1825,
    "product_code": 879,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519244",
    "title": "Ribs vacunas x pieza (0,7kg)",
    "price": 987,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908024/uvlvtz09ktao3xv4esrc.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $1410. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:53:42.712Z",
    "kg_stock": 1,
    "offert_price": 987,
    "product_code": 753,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b519290",
    "title": "Riñón x unidad (0,5kg)",
    "price": 500,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683914321/wq8xgyhy52h39idi6chl.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Precio x kg $1000. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-08-22T19:32:49.629Z",
    "offert_price": 500,
    "product_code": 825
  },
  {
    "_id": "6494a8104ed2f2939b51925b",
    "title": "Roast beef x kg",
    "price": 2815,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909694/fb5p6tedyz4ynvfuugek.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Roast beef x kg",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192b8",
        "name": "Picado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Picado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192b9"
          },
          {
            "name": "Sin picar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192ba"
          },
          {
            "name": "picado 1 vez",
            "price": 0,
            "status": true,
            "_id": "6495f8f13c37db0313553382"
          },
          {
            "name": "Picado 2 veces",
            "price": 0,
            "status": true,
            "_id": "6495f903ce821dd2667cc624"
          }
        ],
        "__v": 2,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-07-19T17:47:29.744Z"
      }
    ],
    "__v": 2,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T14:02:49.496Z",
    "offert_price": 2815,
    "stock": "KILOGRAM",
    "product_code": 716,
    "q_stock": 1
  },
  {
    "_id": "64dd323ee1085f9ea844d474",
    "title": "Salame Criollo",
    "price": 1445,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1692217813/ukfrvvbc66zpm0jq8ge3.png",
    "stock": "QUANTITY",
    "q_stock": 1,
    "product_code": 860,
    "offert_price": 1445,
    "category": "Elaborados",
    "status": true,
    "description": "Salame criollo artesanal Angelani.",
    "options": [],
    "createdAt": "2023-08-16T20:31:58.437Z",
    "updatedAt": "2023-08-22T19:57:57.302Z",
    "__v": 0
  },
  {
    "_id": "6494a8104ed2f2939b51928a",
    "title": "Salchicha parrillera x paquete (5U)",
    "price": 455,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913705/zvo6uaja89xh8almby7s.png",
    "stock": "KILOGRAM",
    "q_stock": 1,
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": true,
    "description": "Precio x kg $1820. El precio publicado es un aproximado por el paquete de 250gr y puede variar en función al peso real.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-08-22T19:50:41.160Z",
    "offert_price": 455,
    "product_code": 855
  },
  {
    "_id": "6494a8104ed2f2939b519289",
    "title": "Salchicha viena x paquete (5U)",
    "price": 1120,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913658/k9oefz1lhyqarhfg4rwc.png",
    "stock": "KILOGRAM",
    "q_stock": 1,
    "kg_stock": 1,
    "category": "Achuras y embutidos",
    "status": false,
    "description": "Salchicha tipo viena envasada de a 5 unidades.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.089Z",
    "updatedAt": "2023-07-10T18:55:22.866Z",
    "offert_price": 0
  },
  {
    "_id": "6494a8104ed2f2939b51927a",
    "title": "Solomillo x paquete (1kg)",
    "price": 2540,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683912297/tyrld2nr0kbllnumxqsf.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Se vende por paquete al vacío de 1kg con 2 unidades. Todas las ofertas son válidas hasta agotar stock.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-09-05T11:09:53.351Z",
    "kg_stock": 1,
    "offert_price": 2540,
    "product_code": 880,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b51926d",
    "title": "Suprema x paquete (1kg)",
    "price": 2065,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683911628/vqgmpbdedmbzahxsl1y0.png",
    "kg_stock": 1,
    "offert_price": 2065,
    "category": "Pollo",
    "status": true,
    "description": "$2035 llevando 2kg o más. Pechuga fresca deshuesada en bolsas de 1kg con 3 o 4 unidades. No aplica para suprema fileteada.\n",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192d3",
        "name": "Fileteado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Fileteado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d4"
          },
          {
            "name": "Sin filetear",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192d5"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.804Z",
        "updatedAt": "2023-06-22T19:59:45.804Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-08-22T19:23:45.287Z",
    "stock": "KILOGRAM",
    "product_code": 800
  },
  {
    "_id": "6494a8104ed2f2939b519272",
    "title": "Supremitas de pollo x paquete (1kg)",
    "price": 2620,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683911860/rqilrpqilam3whqw2ehx.png",
    "q_stock": 1,
    "category": "Elaborados",
    "status": true,
    "description": "OFERTA SEMANAL HASTA AGOTAR STOCK. Trozos de suprema sin procesar rebozados. 1kg x paquete\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.087Z",
    "updatedAt": "2023-08-23T12:40:39.274Z",
    "kg_stock": 1,
    "offert_price": 2620,
    "stock": "QUANTITY",
    "product_code": 914
  },
  {
    "_id": "6494a8104ed2f2939b519248",
    "title": "T-bone (0,5kg)",
    "price": 2155,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908240/nvfzbpu8hmyceemtzigm.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $4310. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:49:19.595Z",
    "kg_stock": 1,
    "offert_price": 2155,
    "product_code": 749,
    "stock": "QUANTITY"
  },
  {
    "_id": "6494a8104ed2f2939b51925c",
    "title": "Tapa de asado x kg",
    "price": 2935,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683909824/gwv7fcfqehqkl08bbfz9.png",
    "kg_stock": 1,
    "offert_price": 2935,
    "category": "Vacuno x kg",
    "status": true,
    "description": "$2900 llevando 2kg o más.",
    "options": [
      {
        "_id": "6494a8314ed2f2939b5192b8",
        "name": "Picado",
        "quantity": 1,
        "status": true,
        "items": [
          {
            "name": "Picado",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192b9"
          },
          {
            "name": "Sin picar",
            "price": 0,
            "status": true,
            "_id": "6494a8314ed2f2939b5192ba"
          }
        ],
        "__v": 0,
        "createdAt": "2023-06-22T19:59:45.803Z",
        "updatedAt": "2023-06-22T19:59:45.803Z"
      }
    ],
    "__v": 1,
    "createdAt": "2023-06-22T19:59:12.085Z",
    "updatedAt": "2023-09-05T13:43:47.467Z",
    "stock": "KILOGRAM",
    "product_code": 719
  },
  {
    "_id": "6494a8104ed2f2939b51923d",
    "title": "Tapa de nalga x pieza (1,5kg)",
    "price": 4260,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683907468/x6ca6iwvqbyjhw0kdtip.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $2840. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.082Z",
    "updatedAt": "2023-09-05T14:15:26.402Z",
    "kg_stock": 1,
    "offert_price": 4260,
    "product_code": 727,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b519245",
    "title": "Tomahawk (1,2-1.5kg)",
    "price": 6500,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683908069/xl8ussorfmho9pv0hfcl.png",
    "q_stock": 1,
    "category": "Vacuno x pieza",
    "status": true,
    "description": "Precio x kg $4380. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T14:51:50.248Z",
    "kg_stock": 1,
    "offert_price": 6500,
    "stock": "QUANTITY",
    "product_code": 752
  },
  {
    "_id": "6494a8104ed2f2939b51927e",
    "title": "Vacío de cerdo x pieza (2kg)",
    "price": 4190,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683913022/zfeofyac7kap6curf785.png",
    "q_stock": 1,
    "category": "Cerdo",
    "status": true,
    "description": "Precio x kg $2095. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.088Z",
    "updatedAt": "2023-08-22T18:43:10.718Z",
    "kg_stock": 1,
    "offert_price": 4190,
    "product_code": 874,
    "stock": "KILOGRAM"
  },
  {
    "_id": "6494a8104ed2f2939b51924b",
    "title": "Vacío fino (0,8-1kg)",
    "price": 5215,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1687629853/bgwven3hzntapnbwnjfo.png",
    "q_stock": 1,
    "category": "Ofertas semanales",
    "status": true,
    "description": "El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n\n",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.083Z",
    "updatedAt": "2023-09-05T13:51:23.014Z",
    "offert_price": 4875,
    "stock": "KILOGRAM",
    "kg_stock": 1,
    "product_code": 710
  },
  {
    "_id": "6494a8104ed2f2939b519267",
    "title": "Vacío x paquete (1kg aprox)",
    "price": 3880,
    "image": "https://res.cloudinary.com/alexispavon010/image/upload/v1683910424/masg2akzrmzxrnm19e8r.png",
    "kg_stock": 1,
    "category": "Vacuno x kg",
    "status": true,
    "description": "Vacío fraccionado en pedazos de 1kg aproximadamente y envasado al vacío. Todas las ofertas son válidas hasta agotar stock.",
    "options": [],
    "__v": 0,
    "createdAt": "2023-06-22T19:59:12.086Z",
    "updatedAt": "2023-09-05T13:52:00.859Z",
    "offert_price": 3880,
    "stock": "KILOGRAM",
    "product_code": 708,
    "q_stock": 1
  },
  {
    title: "Vacío x pieza (4 - 6kg)",
    price: 22000,
    image: "https://res.cloudinary.com/alexispavon010/image/upload/v1683906566/xuntstxmca1pfxmafrgj.png",
    q_stock: 1,
    category: "Vacuno x pieza",
    status: true,
    description: "Precio x kg $3830. El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real.\n",
    options: [],
    __v: 0,
    createdAt: "2023-06-22T19:59:12.081Z",
    updatedAt: "2023-09-05T13:53:28.664Z",
    kg_stock: 1,
    offert_price: 22000,
    stock: "KILOGRAM",
    product_code: 709
  },
  {
    title: "chinchulín x paquete (1kg)",
    price: 1065,
    image: "https://res.cloudinary.com/alexispavon010/image/upload/v1683914379/osbvfd4fkimi5ho61a5k.png",
    stock: "QUANTITY",
    category: "Achuras y embutidos",
    status: true,
    description: "El precio publicado es un aproximado por la pieza entera y puede variar en función al peso real. PRODUCTO NO ENVASADO AL VACÍO\n\n",
    options: [],
    createdAt: "2023-06-22T19:59:12.090Z",
    updatedAt: "2023-08-22T19:35:56.029Z",
    offert_price: 1065,
    product_code: 827
  }
]

