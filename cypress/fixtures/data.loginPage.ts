export const validCredentials = {
  userName: 'Test1234',
  password: '12345678'
}

export const invalidCredentials = [
  {
    userName: 'Test123',
    password: '1234567'
  },
  {
    userName: '        ',
    password: '        '
  }
]

export const borderColors = {
  defaultBlack: 'rgb(220, 220, 220)',
  validGreen: 'rgb(4, 180, 62)',
  invalidRed: 'rgb(212, 32, 39)'
}

export const tooltipText = {
  login:
    'Wprowadź identyfikator otrzymany z banku lub alias - dodatkowy własny identyfikator, samodzielnie zdefiniowany w Demobank online.',
  password:
    'Wprowadź swoje hasło. Sprawdź, czy przycisk Caps Lock jest włączony. Uwaga: 3-krotne wprowadzenie błędnego hasła spowoduje zablokowanie dostępu do systemu.'
}
