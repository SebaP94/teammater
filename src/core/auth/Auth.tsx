import { User } from '@firebase/auth-types'
import React, { useEffect, useState } from 'react'
import app from '../../base'

export const AuthContext = React.createContext<{
  currentUser: User
}>(null)

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User>()

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => setCurrentUser(user))
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
