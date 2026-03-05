/*
 * @Descripttion:
 * @version:
 * @Author: zhangzheng
 * @Date: 2020-12-04 11:31:54
 * @LastEditors: zhangzheng
 * @LastEditTime: 2021-01-05 10:25:33
 */
// import localStorage from 'js-cookie'

const TokenKey = 'Token'
const TokenTypeKey = 'Token-Type'
const FreshTokenKey = 'Fresh-Token'
const Userinfo = 'userinfo'
const BaseUrl = 'baseUrl'
const ConnectedBluetooth = 'connectedBluetooth'

export function getToken() {
  return (
    localStorage.getItem(TokenKey) ||
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjLWV0S0pRQUpTX2ZIZ1V2OWlYUlQ4bWNpdkh0ZU40N3QtVXJYRUhxQ0ZVIn0.eyJleHAiOjE3NTUxNjU2MzgsImlhdCI6MTc1NTEzNjgzOCwianRpIjoiNjA1NzJmMmUtYTc3ZS00ZDZjLWEwNmItZjNmNjhkZmUxODhkIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMTA4Ljc6ODQxMS9hdXRoL3JlYWxtcy9lZGdlIiwiYXVkIjpbIm5vY29jb25zb2xlIiwib2NzLWNvbnRyb2xsZXIiXSwic3ViIjoiYjZjYzM1NmEtYTk1ZC00ZGUzLTkzNWEtMjg0ODhlOTU0MzZhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVzZXJ2ZWQiLCJzZXNzaW9uX3N0YXRlIjoiNGQwNzQ4YWMtMzM3YS00ODVmLWE2ZTgtYzMzZTIyNzA1YTY4IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyLns7vnu5_ov5Dnu7QiXX0sInJlc291cmNlX2FjY2VzcyI6eyJub2NvY29uc29sZSI6eyJyb2xlcyI6WyJub2NvX2NvbnNvbGVfYWRtaW5fcm9sZSJdfSwib2NzLWNvbnRyb2xsZXIiOnsicm9sZXMiOlsib2NzLWNvbnRyb2xsZXItYWRtaW4tcm9sZSIsIm9jcy1jb250cm9sbGVyLXJlYWQtcm9sZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjRkMDc0OGFjLTMzN2EtNDg1Zi1hNmU4LWMzM2UyMjcwNWE2OCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoieWVsaW5rb25jYWxsIn0.UKv9dbB4J-YJYmAGuQ7gtaYhNnp-4VXRfLG0KaddgRy38fhB_EnOJMdAnb69Pdi5KTlHh0THKJsAMXOrbG2CGW2qHsFjAIDbFtrNhKRtk6Bv2ee2xoTRI81UU8V_l-_O-5-v-23A_xq3skWf5VjXN1CY-4ERaOWwlard_YNxvOlCJq8CRBlMEuSsPrYDJ1VDL-lHHzHV_AgcEM3W6rn78zEgBE0bqycnoUvdNqYu56dbY82J4VIs5KzMvONbq0Bziefes7-EWXgCOjNVs0x_AO-bsBbGsQ9q6fL37vrRP6SIQd9w8M-jJ2nWLdc3UspQpi4RVAjhpRFKx5X5oaqCWQ'
  )
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function setTokenType(tokenType) {
  return localStorage.setItem(TokenTypeKey, tokenType)
}

export function removeTokenTypeKey() {
  return localStorage.removeItem(TokenTypeKey)
}

export function getTokenType() {
  return localStorage.getItem(TokenTypeKey) || 'Bearer'
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function setFreshToken(freshToken) {
  return localStorage.setItem(FreshTokenKey, freshToken)
}

export function getFreshToken() {
  return localStorage.getItem(FreshTokenKey)
}

export function removeFreshToken() {
  return localStorage.removeItem(FreshTokenKey)
}

export function getUserinfo() {
  return localStorage.getItem(Userinfo)
}

export function setUserinfo(userinfo) {
  return localStorage.setItem(Userinfo, userinfo)
}

export function removeUserinfo() {
  return localStorage.removeItem(Userinfo)
}

export function getBaseUrl() {
  return localStorage.getItem(BaseUrl)
}

export function setBaseUrl(baseUrl) {
  return localStorage.setItem(BaseUrl, baseUrl)
}

export function removeBaseUrl() {
  return localStorage.removeItem(BaseUrl)
}

export function getConnectedBluetooth() {
  return localStorage.getItem(ConnectedBluetooth)
}

export function setConnectedBluetooth(connectedBluetooth) {
  return localStorage.setItem(ConnectedBluetooth, connectedBluetooth)
}

export function removeConnectedBluetooth() {
  return localStorage.removeItem(ConnectedBluetooth)
}
