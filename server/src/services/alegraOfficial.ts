// server/src/services/alegraOfficial.ts

// Usamos require + any para evitar el error de tipos de dotenv
const dotenv: any = require('dotenv')
dotenv.config()

import Configuration from '../models/Configuration'
// Importamos el SDK y lo casteamos a any para poder llamar a sus métodos
import * as api from '@api/alegraswagger-test'
const sdk: any = api

interface AlegraItem {
  id: string
  name: string
  reference?: string
  description?: string
  type: string
  itemCategory?: { name: string }
  customFields?: { name: string; value: string }[]
  inventory?: { unitCost: number; availableQuantity: number }
}

export const getAlegraItems = async (): Promise<AlegraItem[]> => {
  await updateAuth()

  const params = {
    // Sólo los campos necesarios
    fields:
      'id,name,reference,description,itemCategory,inventory,customFields,type',
  }

  // Llamamos al método getItems del SDK casteado
  const response = await sdk.getItems(params)
  return response.data
}

const updateAuth = async (): Promise<void> => {
  try {
    const emailSetting = await Configuration.findOne({
      where: { key: 'ALEGRA_EMAIL' },
    })
    const tokenSetting = await Configuration.findOne({
      where: { key: 'ALEGRA_TOKEN' },
    })

    const email = emailSetting
      ? emailSetting.value
      : process.env.ALEGRA_EMAIL!
    const token = tokenSetting
      ? tokenSetting.value
      : process.env.ALEGRA_TOKEN!

    // Usamos sdk.auth ahora que es any
    sdk.auth(email, token)
  } catch {
    // En caso de fallo, recargamos de .env
    sdk.auth(process.env.ALEGRA_EMAIL!, process.env.ALEGRA_TOKEN!)
  }
}
