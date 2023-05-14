const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

// Генератор уникальных id
// Используется замыкание, которое гарантирует, что переменная closureCounter всегда будет уникальна
let closureCounter = 1
export function generateUniqueId() {
  const uniqueID = closureCounter
  closureCounter++
  return uniqueID
}

// Функция плюрализации слов.
// Принимает в себя глагол, существительное в единственном числе и окончание множественного числа.
// В зависимости от переданного числа функция возвращает либо фразу со множественным числом существительного, либо с единственным.
export function pluralize(count, verb, noun, suffix = 'а') {
  const countString = String(count)
  const countLastDigit = Number(countString.at(-1))
  const countLastTwoDigits = Number(countString.slice(-2))

  const endsWithLessThanFiveandMoreThanOne = countLastDigit < 5 && countLastDigit > 1

  if (countLastTwoDigits < 10 && endsWithLessThanFiveandMoreThanOne || countLastTwoDigits > 20 && endsWithLessThanFiveandMoreThanOne) {
    return `${verb} ${count} ${noun}${suffix}`
  }

  return `${verb} ${count} ${noun}`

}