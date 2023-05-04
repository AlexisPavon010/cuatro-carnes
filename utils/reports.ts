import * as XLSX from 'xlsx'

import { IOrder } from "@/interfaces/order"

export const orderToXLS = (heads: any, orders: any) => {
  const createXLSLFormatObj = []
  createXLSLFormatObj.push(heads)
  orders.forEach((order: IOrder[]) => {
    createXLSLFormatObj.push(order)
  })
  /* File Name */
  const filename = 'orderReport.xlsx'
  /* Sheet Name */
  const wsName = 'orders'

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj)

  XLSX.utils.book_append_sheet(wb, ws, wsName)

  /* Write workbook and Download */
  XLSX.writeFile(wb, filename)
}