import React from 'react'
import useGlobalHook from 'use-global-hook'

import * as actions from '../actions'

const initialState = {
  profile: null,
  repos: null,
  token: window.localStorage.getItem('token') || null
}

const useGlobal = useGlobalHook(React, initialState, actions)

export default useGlobal
