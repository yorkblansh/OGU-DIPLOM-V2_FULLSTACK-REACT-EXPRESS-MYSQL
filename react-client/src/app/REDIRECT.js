import { useNavigate } from "react-router-dom";

/**
 * Функция для редиректа
 * @param {string} path - Путь для редиректа
 * @returns {void} Ничего не возвращает, делает редирект
 */
export const REDIRECT = (path) => useNavigate()
