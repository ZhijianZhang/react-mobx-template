import request from './request'

export const getTest = () => {
  return request('https://jsonplaceholder.typicode.com/posts/1')
}

export const getTest2 = () => {
  setTimeout(() => {
    return request('https://jsonplaceholder.typicode.com/posts/2')
  }, 1000)
}

export const getTest3 = () => {
  setTimeout(() => {
    return request('https://jsonplaceholder.typicode.com/posts/3')
  }, 2000)
}

export const getTest4 = () => {
  setTimeout(() => {
    return request('https://jsonplaceholder.typicode.com/posts/4')
  }, 3000)
}