import {
  isRequired,
  isEmail,
  isNumber,
  isMinNumber,
  isMaxNumber,
  isLength,
  isMinLength,
  isMaxLength,
  isPattern,
} from '@formiz/validations'

export const required = {
  rule: isRequired(),
  message: 'This fied is required',
}

export const notJustSpaces = {
  rule: isPattern(/^[^A-Za-z0-9]*[A-Za-z0-9][\w\W]*/),
  message: 'This field should not be all spaces',
}

export const email = {
  rule: isEmail(),
  message: 'This is not a valid email',
}

export const number = {
  rule: isNumber(),
  message: 'This is not a valid number',
}

export const pattern = (regex: RegExp) => ({
  rule: isPattern(regex),
  message: 'This is not valid',
})
