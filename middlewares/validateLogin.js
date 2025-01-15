import * as Yup from 'yup'

const loginSchema = Yup.object({
  email: Yup.string().required('campo requerido').email('correo no válido'),
  password: Yup.string().required('La contraseña es obligatoria').min(4, 'Debe tener al menos 4 caracteres').max(255)
})

export default loginSchema