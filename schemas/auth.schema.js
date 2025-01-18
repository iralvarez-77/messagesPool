import * as Yup from 'yup'

export const registerSchema = Yup.object({
  userName: Yup.string().required('El nombre de usuario es obligatorio'),
  email: Yup.string().required('campo requerido').email('correo no válido'),
  password: Yup.string().required('La contraseña es obligatoria').min(4, 'Debe tener al menos 4 caracteres')
})

export const loginSchema = Yup.object({
  email: Yup.string().required('campo requerido').email('correo no válido'),
  password: Yup.string().required('La contraseña es obligatoria').min(4, 'Debe tener al menos 4 caracteres')
})


