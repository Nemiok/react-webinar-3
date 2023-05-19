function formatNumber(number, desiredLocale = 'ru-RU') {
  return new Intl.NumberFormat(desiredLocale).format(number);
}

export default formatNumber