import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  number: yup
    .string()
    .required('É necessário informar o número do usuário')
    .matches(
      /([0-9]){2}([0-9]){9}/g,
      'O número do usuário deve seguir o formato 11999999999'
    ),
});

export const createNewGroupSchema = yup.object().shape({
  name: yup.string().required(),
  value: yup.number().required(),
  endDate: yup.date().required(),
  users: yup
    .array()
    .of(userSchema)
    .required('É necessário adicionar usários no grupo')
    .min(3, 'É necessário no mínimo 3 usuários')
    .test(
      'Números repetidos ou insuficientes',
      'Não é possível adicionar números repetidos nem insuficientes',
      (users) => {
        if (!users) return false;
        return new Set(users).size === users.length;
      }
    ),
});
