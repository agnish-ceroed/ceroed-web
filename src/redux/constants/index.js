export const ActionTypes = {
    
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
};

export const STATUS = {
    IDLE: 'idle',
    RUNNING: 'running',
    READY: 'ready',
    SUCCESS: 'success',
    ERROR: 'error'
};

const API_BASE_URL = 'https://api-shop.shopsapp.org/admin';

export const APIEndpoints = {
  LOGIN: `${API_BASE_URL}/login`,
}